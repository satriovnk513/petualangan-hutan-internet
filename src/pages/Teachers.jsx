import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PrivacyNotice from '../components/PrivacyNotice'
import { getContent } from '../data/content'
import { getLevels } from '../data/levels'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* CATATAN: tombol unduh PDF sengaja belum ditampilkan karena berkas
 * panduannya belum final. Setelah PDF asli tersedia, tambahkan kembali
 * komponen DownloadCard di bagian bawah halaman ini. */
export default function Teachers() {
  const { lang } = useLang()
  const t = getUi(lang)
  const c = getContent(lang).teacher
  const levels = getLevels(lang)

  useEffect(() => {
    document.title = t.titles.teachers
  }, [t])

  return (
    <div className="container container--narrow section">
      <div className="page-head">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">👩‍🏫</span> {c.eyebrow}
        </span>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </div>

      <div className="grid grid--2" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="card">
          <span className="card__eyebrow">{c.audienceLabel}</span>
          <p style={{ marginBottom: 0, fontWeight: 700 }}>{c.audience}</p>
        </div>
        <div className="card">
          <span className="card__eyebrow">{c.durationLabel}</span>
          <p style={{ marginBottom: 0, fontWeight: 700 }}>{c.duration}</p>
        </div>
      </div>

      <section className="section--tight" aria-labelledby="tujuan">
        <h2 id="tujuan">{c.objectivesTitle}</h2>
        <p>{c.objectivesIntro}</p>
        <ul>
          {c.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <section className="section--tight" aria-labelledby="isi-permainan">
        <h2 id="isi-permainan">{c.contentTitle}</h2>
        <p>{c.contentIntro}</p>
        <div className="grid grid--2">
          {levels.map((level) => (
            <article className="card" key={level.id}>
              <span className="card__eyebrow">
                {t.home.levelLabel} {level.id}
              </span>
              <h3 style={{ fontSize: 'var(--text-lg)' }}>{level.title}</h3>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 'var(--sp-2)' }}>{level.topic}</p>
              <p style={{ marginBottom: 0, fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                <span aria-hidden="true">{level.badge.emoji}</span> {c.badgeLabel}: {level.badge.name}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section--tight" aria-labelledby="cara-pakai">
        <h2 id="cara-pakai">{c.usageTitle}</h2>
        <div className="grid grid--2">
          {c.classroomOptions.map((option) => (
            <article className="card" key={option.title}>
              <span style={{ fontSize: '2rem' }} aria-hidden="true">
                {option.emoji}
              </span>
              <h3 style={{ fontSize: 'var(--text-lg)', marginTop: 'var(--sp-2)' }}>{option.title}</h3>
              <p style={{ marginBottom: 0, color: 'var(--ink-soft)' }}>{option.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section--tight" aria-labelledby="rencana-sesi">
        <h2 id="rencana-sesi">{c.sessionTitle}</h2>
        <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--sp-2)' }}>
          {c.sessionPlan.map((row) => (
            <li
              key={row.activity}
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr',
                gap: 'var(--sp-3)',
                alignItems: 'center',
                padding: 'var(--sp-3) var(--sp-4)',
                marginBottom: 0,
              }}
            >
              <span className="pill">{row.time}</span>
              <span>{row.activity}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section--tight" aria-labelledby="diskusi">
        <h2 id="diskusi">{c.discussionTitle}</h2>
        <ol>
          {c.discussionQuestions.map((question) => (
            <li key={question} style={{ fontSize: 'var(--text-lg)' }}>
              {question}
            </li>
          ))}
        </ol>
      </section>

      <section className="section--tight" aria-labelledby="catatan-guru">
        <h2 id="catatan-guru">{c.notesTitle}</h2>
        <div className="notice notice--warm">
          <span className="notice__icon" aria-hidden="true">
            ⚠️
          </span>
          <div>
            <ul style={{ marginBottom: 0 }}>
              {c.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PrivacyNotice />

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Link className="btn btn--accent btn--lg" to="/mulai">
          {c.tryBtn}
        </Link>
        <Link className="btn btn--ghost btn--lg" to="/orang-tua">
          {c.otherGuideBtn}
        </Link>
      </div>
    </div>
  )
}
