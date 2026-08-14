import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Satu tempat di peta Hutan Internet.
 * Status (terkunci / terbuka / selesai) selalu ditulis sebagai teks,
 * tidak hanya lewat warna atau ikon. */
export default function MapNode({ level, unlocked, complete, current, score, onOpen }) {
  const { lang } = useLang()
  const t = getUi(lang)

  const statusText = complete ? t.map.statusDone : unlocked ? t.map.statusOpen : t.map.statusLocked
  const statusClass = complete ? 'done' : unlocked ? 'open' : 'locked'

  return (
    <li>
      <button
        type="button"
        className={`node ${complete ? 'node--done' : ''} ${!unlocked ? 'node--locked' : ''} ${
          current ? 'node--current' : ''
        }`}
        onClick={() => onOpen(level)}
        disabled={!unlocked}
        aria-describedby={`node-status-${level.id}`}
      >
        <span className="node__badge" aria-hidden="true">
          <span className="node__num">{level.id}</span>
          {complete ? level.treasure.symbol : unlocked ? '🌿' : '🔒'}
        </span>

        <span className="node__body">
          <span className="node__title">{level.title}</span>
          <span className="node__topic">{level.topic}</span>
          <span className={`node__status node__status--${statusClass}`} id={`node-status-${level.id}`}>
            {complete ? (
              <>
                ✓ {statusText} · {t.map.ofPoints(score)}
              </>
            ) : (
              <>
                {unlocked ? '▶' : '🔒'} {statusText}
                {/* Pemisahnya memakai titik tengah, sama seperti baris
                 * "selesai" di atas, supaya tidak ada tanda pisah di teks. */}
                {!unlocked && ` · ${t.map.lockedHint}`}
              </>
            )}
          </span>
        </span>

        <span className="node__go" aria-hidden="true">
          {unlocked && (
            <span className="pill">
              {complete ? t.map.nodeReplay : current ? t.map.nodeContinue : t.map.nodeOpen} →
            </span>
          )}
        </span>
      </button>
    </li>
  )
}
