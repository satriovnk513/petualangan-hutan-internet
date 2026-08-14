import pikoChatbotImg from '../../assets/characters/piko_chatbot.png'

/* Bubble pesan tunggal — user atau bot. */
export default function ChatMessage({ role, text, sourceLabel, sourcePrefix }) {
  const isBot = role === 'bot'

  return (
    <div className={`chatmsg chatmsg--${role}`} aria-live={isBot ? 'polite' : undefined}>
      {isBot && (
        <span className="chatmsg__avatar" aria-hidden="true">
          <img src={pikoChatbotImg} alt="" className="chatmsg__avatar-img" />
        </span>
      )}
      <div className="chatmsg__bubble">
        {/* Render teks dengan baris baru */}
        {text.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < text.split('\n').length - 1 && <br />}
          </span>
        ))}
        {isBot && sourceLabel && (
          <p className="chatmsg__source">
            {sourcePrefix} <em>{sourceLabel}</em>
          </p>
        )}
      </div>
    </div>
  )
}
