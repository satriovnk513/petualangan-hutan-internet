/**
 * Floating action button yang membuka chatbot.
 * Diletakkan sudut kanan bawah layar.
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
      {/* Ikon kombinasi hutan + chat */}
      <span className="chatbot-btn__icon" aria-hidden="true">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          aria-hidden="true"
        >
          {/* Lingkaran latar */}
          <circle cx="24" cy="24" r="22" fill="#1c6b4a" />
          {/* Pohon kecil */}
          <path d="M24 8 L32 20 L24 36 L16 20 Z" fill="#ffd166" />
          <path d="M24 8 L32 20 L24 23 Z" fill="#fff1c9" />
          <path d="M16 20 L24 23 L24 36 Z" fill="#e08e0b" />
          {/* Gelembung chat */}
          <rect x="28" y="28" width="14" height="10" rx="3" fill="white" opacity="0.9" />
          <circle cx="32" cy="33" r="1.2" fill="#1c6b4a" />
          <circle cx="35" cy="33" r="1.2" fill="#1c6b4a" />
          <circle cx="38" cy="33" r="1.2" fill="#1c6b4a" />
        </svg>
      </span>
      {hasUnread && (
        <span className="chatbot-btn__badge" aria-hidden="true" />
      )}
    </button>
  )
}
