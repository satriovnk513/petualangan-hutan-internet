import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { characterArt } from '../utils/assets'
import GuideBubble from '../components/GuideBubble'
import { useGame } from '../context/GameContext'
import { useSound } from '../hooks/useSound'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'
import { useSEO } from '../hooks/useSEO'

/* Pemain memilih akan bermain bersama siapa.
 * Pilihan ini hanya mengubah avatar dan sapaan — cerita tetap sama.
 * Nama lengkap anak TIDAK pernah diminta di sini. */
export default function CharacterSelect() {
  const { character, chooseCharacter } = useGame()
  const { play } = useSound()
  const navigate = useNavigate()
  const [picked, setPicked] = useState(character)
  const { lang } = useLang()
  const t = getUi(lang)

  useSEO({
    title: t.titles.select,
    description: lang === 'en'
      ? 'Choose your adventure companion: Arif or Safira!'
      : 'Pilih teman petualanganmu di Hutan Internet: Arif atau Safira!',
    lang,
  })

  const options = [
    { id: 'arif', name: t.select.arif, trait: t.select.arifTrait, art: 'arif_happy' },
    { id: 'safira', name: t.select.safira, trait: t.select.safiraTrait, art: 'safira_happy' },
  ]

  const select = (id) => {
    play('tap')
    setPicked(id)
    chooseCharacter(id)
  }

  const go = () => {
    if (!picked) return
    play('reveal')
    navigate('/main')
  }

  return (
    <div className="container container--narrow section">
      <div className="page-head">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">🙋</span> {t.select.eyebrow}
        </span>
        <h1>{t.select.title}</h1>
        <p>{t.select.sub}</p>
      </div>

      <div className="picker">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="picker__option"
            aria-pressed={picked === option.id}
            onClick={() => select(option.id)}
          >
            <img className="picker__img" src={characterArt[option.art]} alt="" aria-hidden="true" />
            <span className="picker__name">{option.name}</span>
            <p className="picker__trait">{option.trait}</p>
            <span className="picker__check">
              {picked === option.id ? t.select.picked : t.select.tapToPick}
            </span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'var(--sp-5)' }}>
        <GuideBubble mood="happy">{t.select.pikoHello}</GuideBubble>
      </div>

      <div className="notice notice--leaf" style={{ marginTop: 'var(--sp-5)' }}>
        <span className="notice__icon" aria-hidden="true">
          🔐
        </span>
        <p style={{ marginBottom: 0 }}>{t.select.nameNote}</p>
      </div>

      <div className="action-bar btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <button
          type="button"
          className="btn btn--primary btn--lg"
          onClick={go}
          disabled={!picked}
          aria-disabled={!picked}
        >
          {t.select.go}
        </button>
        {!picked && <span className="sr-only">{t.select.pickFirst}</span>}
      </div>
    </div>
  )
}
