import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PrivacyNotice from '../components/PrivacyNotice'
import GuideBubble from '../components/GuideBubble'
import { getContent } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* CATATAN: tombol unduh PDF sengaja belum ditampilkan karena berkas
 * panduannya belum final. Setelah PDF asli tersedia, tambahkan kembali
 * komponen DownloadCard di bagian bawah halaman ini. */
export default function Parents() {
  const { lang } = useLang()
  const t = getUi(lang)
  const c = getContent(lang).parent

  useEffect(() => {
    document.title = t.titles.parents
  }, [t])

  return (
    <div className="container container--narrow section">
      <div className="page-head">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">👨‍👩‍👧</span> {c.eyebrow}
        </span>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </div>

      <section className="section--tight" aria-labelledby="kebiasaan">
        <h2 id="kebiasaan">{c.habitsTitle}</h2>
        <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--sp-3)' }}>
          {c.habits.map((habit) => (
            <li
              key={habit.number}
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 'var(--sp-4)',
                alignItems: 'start',
                marginBottom: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--sun-400)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: '#4a3505',
                }}
              >
                {habit.number}
              </span>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-1)' }}>{habit.title}</h3>
                <p style={{ marginBottom: 0, color: 'var(--ink-soft)' }}>{habit.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section--tight" aria-labelledby="obrolan">
        <h2 id="obrolan">{c.startersTitle}</h2>
        <p>{c.startersIntro}</p>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--sp-2)' }}>
          {c.conversationStarters.map((question) => (
            <li
              key={question}
              className="card"
              style={{
                display: 'flex',
                gap: 'var(--sp-3)',
                alignItems: 'center',
                padding: 'var(--sp-3) var(--sp-4)',
                marginBottom: 0,
                fontSize: 'var(--text-lg)',
              }}
            >
              <span aria-hidden="true">💬</span>
              {question}
            </li>
          ))}
        </ul>
      </section>

      <section className="section--tight" aria-labelledby="pengingat">
        <h2 id="pengingat">{c.reminderTitle}</h2>
        <div className="notice notice--leaf">
          <span className="notice__icon" aria-hidden="true">
            💚
          </span>
          <p style={{ marginBottom: 0, fontSize: 'var(--text-lg)' }}>{c.reminder}</p>
        </div>
      </section>

      <GuideBubble mood="happy" tone="warm">
        {c.pikoParent}
      </GuideBubble>

      <div style={{ marginTop: 'var(--sp-5)' }}>
        <PrivacyNotice />
      </div>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Link className="btn btn--accent btn--lg" to="/mulai">
          {c.playBtn}
        </Link>
        <Link className="btn btn--ghost btn--lg" to="/guru">
          {c.otherGuideBtn}
        </Link>
      </div>
    </div>
  )
}
