import { getLevels } from '../data/levels'
import { characterArt } from '../utils/assets'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Sertifikat cetak A4 mendatar. Ukurannya mengikuti lebar wadah
 * (container query) supaya tampilan di layar dan di kertas sama persis. */
export default function Certificate({ name, dateText, percentage }) {
  const { lang } = useLang()
  const t = getUi(lang)
  const levels = getLevels(lang)

  const displayName = name?.trim() || t.cert.defaultName

  return (
    <div className="certificate" role="img" aria-label={t.cert.ariaLabel(displayName)}>
      <span className="certificate__frame" aria-hidden="true" />

      <svg className="certificate__leaf certificate__leaf--tl" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M6 94 C 10 44, 44 10, 94 6 C 90 56, 56 90, 6 94 Z" fill="#9fd9bd" opacity="0.55" />
        <path d="M8 92 C 40 60, 62 38, 92 8" stroke="#2f9e6f" strokeWidth="3" fill="none" />
      </svg>
      <svg className="certificate__leaf certificate__leaf--br" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M6 94 C 10 44, 44 10, 94 6 C 90 56, 56 90, 6 94 Z" fill="#ffd166" opacity="0.5" />
        <path d="M8 92 C 40 60, 62 38, 92 8" stroke="#e08e0b" strokeWidth="3" fill="none" />
      </svg>

      <div className="certificate__inner">
        <div>
          <h2 className="certificate__title">{t.cert.heading}</h2>
          <div className="certificate__subtitle">{t.cert.subtitle}</div>
          <svg className="certificate__crest" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#1c6b4a" />
            <path d="M32 12 L46 28 L32 54 L18 28 Z" fill="#ffd166" />
            <path d="M32 12 L46 28 L32 32 Z" fill="#fff1c9" />
            <path d="M18 28 L32 32 L32 54 Z" fill="#e08e0b" />
          </svg>
        </div>

        <div>
          <p className="certificate__given">{t.cert.presentedTo}</p>
          <p className="certificate__name">{displayName}</p>
        </div>

        <div>
          <p className="certificate__body">{t.cert.body}</p>

          <div className="certificate__badges">
            {levels.map((level) => (
              <div className="certificate__badge" key={level.id}>
                <span className="certificate__badge-medal" aria-hidden="true">
                  {level.treasure.symbol}
                </span>
                <span className="certificate__badge-name">{level.treasure.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="certificate__foot">
          <div className="certificate__meta">
            <strong>{dateText}</strong>
            {t.cert.dateLabel}
          </div>

          <div className="certificate__cast">
            <img src={characterArt.arif_happy} alt="" aria-hidden="true" />
            <img src={characterArt.piko_happy} alt="" aria-hidden="true" />
            <img src={characterArt.safira_happy} alt="" aria-hidden="true" />
          </div>

          <div className="certificate__meta certificate__meta--right">
            <strong>
              {percentage}% {t.cert.pctLabel}
            </strong>
            {t.cert.pctSub}
          </div>
        </div>
      </div>
    </div>
  )
}
