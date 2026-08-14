import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { getUi } from '../../data/ui'
import { generateAnswer } from '../../chatbot/chatService'
import { getRandomQuestions } from '../../chatbot/quickQuestions'
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

  // Bank pertanyaan yang berputar / acak (tampilkan 2 pertanyaan terbaca penuh tanpa scroll horizontal)
  const [suggestedQuestions, setSuggestedQuestions] = useState(() => getRandomQuestions(lang, 2))

  // Perbarui pertanyaan saat bahasa berganti
  useEffect(() => {
    setSuggestedQuestions(getRandomQuestions(lang, 2))
  }, [lang])

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

  // Fungsi untuk mengacak pertanyaan ide baru
  const handleRefreshQuestions = useCallback(() => {
    setSuggestedQuestions((prev) => getRandomQuestions(langRef.current, 2, prev))
  }, [])

  const sendMessage = useCallback(async (query) => {
    /* Tambah pesan user. */
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', text: query, sourceLabel: null },
    ])
    // Otomatis putar pertanyaan baru saat user mengirim pertanyaan
    setSuggestedQuestions((prev) => getRandomQuestions(langRef.current, 2, prev))
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
      {/* Floating button — HANYA tampil saat chatbot tertutup agar tidak menghalangi input di mobile */}
      {!open && (
        <ChatbotButton
          label={t.openLabel}
          onClick={handleOpen}
          hasUnread={hasUnread}
        />
      )}

      {/* Panel chatbot */}
      {open && (
        <ChatbotPanel
          t={t}
          messages={messages}
          isThinking={isThinking}
          isError={isError}
          questions={suggestedQuestions}
          onRefreshQuestions={handleRefreshQuestions}
          onSend={sendMessage}
          onClose={handleClose}
          onQuickQuestion={sendMessage}
        />
      )}
    </>
  )
}

