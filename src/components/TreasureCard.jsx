import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Kartu harta karun (kunci, kompas, lensa, perisai, mahkota).
 * Harta yang belum ditemukan tampil pudar dan tetap diberi
 * keterangan teks, bukan hanya warna. */
export default function TreasureCard({ treasure, found = false }) {
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <div className={`treasure-card ${found ? '' : 'treasure-card--locked'}`}>
      <span
        className="treasure-card__medal"
        style={found ? { borderColor: treasure.color } : undefined}
        aria-hidden="true"
      >
        {treasure.symbol}
      </span>
      <span className="treasure-card__name">{found ? treasure.name : t.treasureCard.lockedName}</span>
      <p className="treasure-card__desc">
        {found ? treasure.description : t.treasureCard.lockedDesc(treasure.name)}
      </p>
      <span className="sr-only">
        {found ? t.treasureCard.srFound(treasure.name) : t.treasureCard.srLocked}
      </span>
    </div>
  )
}
