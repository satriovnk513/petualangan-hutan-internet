import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Kartu lencana. Lencana yang belum didapat tetap ditampilkan
 * supaya anak tahu apa yang bisa dikumpulkan berikutnya. */
export default function BadgeCard({ badge, earned = false }) {
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <div className={`badge-card ${earned ? '' : 'badge-card--locked'}`}>
      <span className="badge-card__medal" aria-hidden="true">
        {earned ? badge.emoji : '🔒'}
      </span>
      <span className="badge-card__name">{badge.name}</span>
      <p className="badge-card__desc">{earned ? badge.description : t.badgeCard.lockedDesc}</p>
      <span className="sr-only">
        {earned ? t.badgeCard.srEarned(badge.name) : t.badgeCard.srLocked(badge.name)}
      </span>
    </div>
  )
}
