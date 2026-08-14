import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GuideBubble from '../components/GuideBubble'
import SceneArt from '../components/SceneArt'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

export default function NotFound() {
  const { lang } = useLang()
  const t = getUi(lang)

  useEffect(() => {
    document.title = t.titles.notFound
  }, [t])

  return (
    <div className="container container--narrow section">
      <div className="scene" style={{ marginBottom: 'var(--sp-5)' }}>
        <SceneArt variant="cave" />
        <span className="scene__label">{t.notFound.sceneLabel}</span>
      </div>

      <div className="card card--paper">
        <h1>{t.notFound.title}</h1>
        <p style={{ fontSize: 'var(--text-lg)' }}>{t.notFound.body}</p>
        <GuideBubble mood="point">{t.notFound.piko}</GuideBubble>
        <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
          <Link className="btn btn--accent btn--lg" to="/">
            {t.notFound.home}
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/main">
            {t.notFound.map}
          </Link>
        </div>
      </div>
    </div>
  )
}
