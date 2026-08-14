import { useEffect } from 'react'
import ResetProgressButton from '../components/ResetProgressButton'
import { getContent } from '../data/content'
import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

export default function Privacy() {
  const { storageAvailable } = useGame()
  const { lang } = useLang()
  const t = getUi(lang)
  const c = getContent(lang).privacy

  useEffect(() => {
    document.title = t.titles.privacy
  }, [t])

  return (
    <div className="container container--narrow section">
      <div className="page-head">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">🛡️</span> {c.eyebrow}
        </span>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--sp-3)' }}>
        {c.points.map((point) => (
          <li
            key={point.title}
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'var(--sp-4)',
              alignItems: 'start',
              marginBottom: 0,
            }}
          >
            <span style={{ fontSize: '1.8rem' }} aria-hidden="true">
              {point.emoji}
            </span>
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-1)' }}>{point.title}</h2>
              <p style={{ marginBottom: 0, color: 'var(--ink-soft)' }}>{point.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="section--tight" aria-labelledby="hapus-data">
        <h2 id="hapus-data">{c.resetTitle}</h2>
        <p>{c.resetText}</p>
        {!storageAvailable && (
          <div className="notice notice--warm">
            <span className="notice__icon" aria-hidden="true">
              ℹ️
            </span>
            <p style={{ marginBottom: 0 }}>{c.storageBlocked}</p>
          </div>
        )}
        <ResetProgressButton />
      </section>
    </div>
  )
}
