import { useCallback, useRef, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { getUi } from '../../data/ui'
import { generateAnswer } from '../../chatbot/chatService'
import ChatbotButton from './ChatbotButton'
import ChatbotPanel from './ChatbotPanel'

let msgCounter = 0
const nextId = () => `msg-${++msgCounter}`

/**
 * Root chatbot — state management + orkestrator.
 * Diletakkan di App.jsx sehingga tersedia di semua halaman.
 */
export default function ChatbotRoot() {
  const { lang } = useLang()
  const t = getUi(lang).chatbot

  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showChips, setShowChips] = useState(true)

  /* Inisialisasi pesan dengan greeting bot. */
  const [messages, setMessages] = useState(() => [
    {
      id: nextId(),
      role: 'bot',
      text: t.greeting,
      sourceLabel: null,
    },
  ])

  /* Ref ke bahasa aktif saat async selesai (hindari stale closure). */
  const langRef = useRef(lang)
  langRef.current = lang

  /* Ref ke t saat async selesai. */
  const tRef = useRef(t)
  tRef.current = t

  const handleOpen = useCallback(() => {
    setOpen(true)
    setHasUnread(false)
  }, [])

  const handleClose = useCallback(() => setOpen(false), [])

  const sendMessage = useCallback(async (query) => {
    /* Tambah pesan user. */
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', text: query, sourceLabel: null },
    ])
    setShowChips(false)
    setIsThinking(true)
    setIsError(false)

    try {
      const result = await generateAnswer(query, langRef.current)
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'bot',
          text: result.text,
          sourceLabel: result.isFallback ? null : result.sourceLabel,
        },
      ])
      if (!open) setHasUnread(true)
    } catch {
      setIsError(true)
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'bot',
          text: tRef.current.errorMessage,
          sourceLabel: null,
        },
      ])
    } finally {
      setIsThinking(false)
    }
  }, [open])

  return (
    <>
      {/* Floating button — selalu tampil */}
      <ChatbotButton
        label={t.openLabel}
        onClick={handleOpen}
        hasUnread={hasUnread}
      />

      {/* Panel chatbot */}
      {open && (
        <ChatbotPanel
          t={t}
          messages={messages}
          isThinking={isThinking}
          isError={isError}
          showChips={showChips}
          onSend={sendMessage}
          onClose={handleClose}
          onQuickQuestion={sendMessage}
        />
      )}
    </>
  )
}
