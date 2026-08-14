import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PrivacyNotice from '../components/PrivacyNotice'
import { getContent } from '../data/content'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* CATATAN: bagian tim, sekolah mitra, dan kontak sengaja belum
 * ditampilkan karena datanya belum ada. Setelah nama tim, mitra, dan
 * alamat kontak sudah pasti, tambahkan bagiannya di sini — jangan
 * pernah menampilkan teks contoh seperti "[Nama anggota tim]". */
export default function About() {
  const { lang } = useLang()
  const t = getUi(lang)
  const c = getContent(lang).about

  useEffect(() => {
    document.title = t.titles.about
  }, [t])

  return (
    <div className="container container--narrow section">
      <div className="page-head">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">💡</span> {c.eyebrow}
        </span>
        <h1>{c.title}</h1>
        {c.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {c.sections.map((section) => (
        <section className="section--tight" key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id}>
            <span aria-hidden="true">{section.emoji}</span> {section.title}
          </h2>
          {section.style === 'list' ? (
            <ul>
              {section.items.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          ) : (
            section.items.map((text) => <p key={text}>{text}</p>)
          )}
        </section>
      ))}

      {/* --- Hackathon --- */}
      <section className="section--tight" aria-labelledby="hackathon">
        <h2 id="hackathon">
          <span aria-hidden="true">🌍</span> {c.hackathonTitle}
        </h2>
        <div className="notice">
          <span className="notice__icon" aria-hidden="true">
            ℹ️
          </span>
          <p style={{ marginBottom: 0 }}>{c.hackathonText}</p>
        </div>
      </section>

      <PrivacyNotice />

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Link className="btn btn--accent btn--lg" to="/mulai">
          {c.startBtn}
        </Link>
        <Link className="btn btn--ghost btn--lg" to="/privasi">
          {c.privacyBtn}
        </Link>
      </div>
    </div>
  )
}
