import { characterArt } from '../utils/assets'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Piko, burung pemandu, memberi tip singkat dan semangat. */
export default function GuideBubble({ children, mood = 'point', tone = 'cool' }) {
  const src = characterArt[`piko_${mood}`] ?? characterArt.piko_happy
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <div className={`guide ${tone === 'warm' ? 'guide--warm' : ''}`}>
      <img className="guide__bird" src={src} alt={t.guide.alt} loading="lazy" />
      <div className="guide__bubble">
        <span className="guide__name">{t.guide.says}</span>
        <p>{children}</p>
      </div>
    </div>
  )
}
