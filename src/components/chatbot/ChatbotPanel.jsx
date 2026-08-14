import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import pikoChatbotImg from '../../assets/characters/piko_chatbot.png'

/**
 * Panel chatbot — area percakapan, input, quick chips, indikator thinking.
 * Menerima semua state dari ChatbotRoot (controlled component).
 */
export default function ChatbotPanel({
  t,                    // chatbot UI strings dari i18n
  messages,             // array { id, role, text, sourceLabel }
  isThinking,
  isError,
  questions = [],       // array pertanyaan acak / dinamis
  onRefreshQuestions,   // callback untuk ganti ide pertanyaan
  onSend,
  onClose,
  onQuickQuestion,
}) {
  const [draft, setDraft] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  /* Scroll ke pesan terbaru setiap kali pesan bertambah. */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isThinking])

  /* Focus trap: Tab / Shift+Tab dan Escape (TIDAK autofocus input di mobile agar keyboard tidak langsung muncul) */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = panel.querySelectorAll(
        'button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', handleKeyDown)
    return () => panel.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed || isThinking) return
    onSend(trimmed)
    setDraft('')
  }

  const handleQuickClick = (q) => {
    if (isThinking) return
    onQuickQuestion(q)
  }

  return (
    <div
      className="chatbot-panel"
      role="dialog"
      aria-modal="false"
      aria-label={t.title}
      ref={panelRef}
    >
      {/* Header */}
      <div className="chatbot-panel__header">
        <img
          src={pikoChatbotImg}
          alt=""
          className="chatbot-panel__avatar"
          aria-hidden="true"
        />
        <h2 className="chatbot-panel__title" id="chatbot-title">{t.title}</h2>
        <button
          type="button"
          className="chatbot-panel__close"
          onClick={onClose}
          aria-label={t.close}
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Messages area */}
      <div
        className="chatbot-panel__messages"
        role="log"
        aria-live="polite"
        aria-label="Percakapan chatbot"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            text={msg.text}
            sourceLabel={msg.sourceLabel}
            sourcePrefix={t.sourcePrefix}
          />
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div className="chatbot-thinking" aria-label={t.thinking} role="status">
            <img
              src={pikoChatbotImg}
              alt=""
              className="chatbot-thinking__avatar"
              aria-hidden="true"
            />
            <div className="chatbot-thinking__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="sr-only">{t.thinking}</span>
          </div>
        )}

        {/* Error state */}
        {isError && !isThinking && (
          <div className="chatbot-error" role="alert">
            <span aria-hidden="true">⚠️</span> {t.errorMessage}
          </div>
        )}

        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Quick question chips — selalu tampil dan dapat di-refresh */}
      {questions && questions.length > 0 && (
        <div className="chatbot-chips" role="group" aria-label={t.ideasTitle || 'Ide Pertanyaan'}>
          <div className="chatbot-chips__header">
            <span className="chatbot-chips__title">
              <span aria-hidden="true">💡</span> {t.ideasTitle || 'Ide Pertanyaan'}
            </span>
            <button
              type="button"
              className="chatbot-chips__refresh"
              onClick={onRefreshQuestions}
              aria-label={t.refreshAria || 'Ganti ide pertanyaan'}
              title={t.refreshIdeas || 'Ganti Ide'}
              disabled={isThinking}
            >
              <span className="chatbot-chips__refresh-icon" aria-hidden="true">🔄</span>
              <span>{t.refreshIdeas || 'Ganti Ide'}</span>
            </button>
          </div>
          <div className="chatbot-chips__list">
            {questions.map((q) => (
              <button
                key={q}
                type="button"
                className="chatbot-chip"
                onClick={() => handleQuickClick(q)}
                disabled={isThinking}
              >
                <span className="chatbot-chip__text">{q}</span>
                <span className="chatbot-chip__arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form className="chatbot-input-row" onSubmit={handleSubmit} noValidate>
        <textarea
          ref={inputRef}
          className="chatbot-input"
          rows={1}
          maxLength={500}
          placeholder={t.inputPlaceholder}
          value={draft}
          aria-label={t.inputPlaceholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          disabled={isThinking}
        />
        <button
          type="submit"
          className="chatbot-send"
          aria-label={t.send}
          disabled={!draft.trim() || isThinking}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

