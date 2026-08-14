import { characterArt } from '../utils/assets'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Foto bulat tokoh. Dipakai di header permainan, hasil, dan sertifikat. */
export default function CharacterAvatar({ character = 'arif', mood = 'happy', size = 'md', alt }) {
  const key = `${character}_${mood}`
  const src = characterArt[key] ?? characterArt[`${character}_happy`] ?? characterArt.piko_happy
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <span className={`avatar avatar--${size}`}>
      <img src={src} alt={alt ?? t.alts[character] ?? ''} loading="lazy" />
    </span>
  )
}
