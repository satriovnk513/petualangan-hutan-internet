import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Pengalih suara. Bawaannya mati, dan statusnya diumumkan
 * lewat aria-pressed serta teks, bukan hanya ikon. */
export default function SoundToggle() {
  const { soundOn, toggleSound } = useGame()
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <button
      type="button"
      className="sound-toggle no-print"
      aria-pressed={soundOn}
      onClick={toggleSound}
      title={soundOn ? t.sound.turnOff : t.sound.turnOn}
    >
      <span aria-hidden="true">{soundOn ? '🔊' : '🔈'}</span>
      <span className="sound-toggle__text">{soundOn ? t.sound.on : t.sound.off}</span>
      <span className="sr-only">{soundOn ? t.sound.srOn : t.sound.srOff}</span>
    </button>
  )
}
