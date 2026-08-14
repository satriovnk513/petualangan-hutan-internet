import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { characterArt } from '../utils/assets'
import SceneArt from '../components/SceneArt'
import { useGame } from '../context/GameContext'
import { useSound } from '../hooks/useSound'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Cerita pembuka sebelum anak masuk ke Hutan Internet. */
export default function Intro() {
  const { markIntroSeen, character } = useGame()
  const { play } = useSound()
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = getUi(lang)

  useEffect(() => {
    document.title = t.titles.intro
  }, [t])

  const start = () => {
    play('reveal')
    markIntroSeen()
    /* Kalau tokoh sudah pernah dipilih, langsung ke peta. */
    navigate(character ? '/main' : '/pilih-tokoh')
  }

  return (
    <div className="container container--narrow section">
      <div className="scene" style={{ marginBottom: 'var(--sp-5)' }}>
        <SceneArt variant="gate" />
        <img
          className="scene__figure"
          style={{ right: 'auto', left: '4%', maxWidth: '40%' }}
          src={characterArt.duo_shy}
          alt={t.intro.altDuo}
        />
        <img
          className="scene__figure"
          style={{ right: '4%', height: '52%', maxWidth: '32%' }}
          src={characterArt.piko_happy}
          alt={t.intro.altPiko}
        />
        <span className="scene__label">{t.intro.sceneLabel}</span>
      </div>

      <div className="card card--paper">
        <span className="card__eyebrow">{t.intro.chapter}</span>
        <h1>{t.intro.title}</h1>

        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.75 }}>{t.intro.p1}</p>
        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.75 }}>{t.intro.p2}</p>
        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.75 }}>{t.intro.p3}</p>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 1.75,
            fontWeight: 800,
            color: 'var(--forest-800)',
          }}
        >
          {t.intro.question}
        </p>

        <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
          <button type="button" className="btn btn--accent btn--lg" onClick={start}>
            <span aria-hidden="true">🌟</span> {t.intro.start}
          </button>
          <Link className="btn btn--ghost btn--lg" to="/">
            {t.intro.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
