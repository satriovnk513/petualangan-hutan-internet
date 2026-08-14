import pikoChatbotImg from '../../assets/characters/piko_chatbot.png'

/**
 * Floating action button yang membuka chatbot Tanya Piko.
 * Diletakkan sudut kanan bawah layar dengan avatar Piko.
 */
export default function ChatbotButton({ label, onClick, hasUnread }) {
  return (
    <button
      type="button"
      className="chatbot-btn"
      onClick={onClick}
      aria-label={label}
      aria-haspopup="dialog"
    >
      <img
        src={pikoChatbotImg}
        alt="Piko"
        className="chatbot-btn__img"
      />
      {hasUnread && (
        <span className="chatbot-btn__badge" aria-hidden="true" />
      )}
    </button>
  )
}

