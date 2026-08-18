import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import PrivacyNotice from '../components/PrivacyNotice'
import GuideBubble from '../components/GuideBubble'
import { getContent } from '../data/content'
import { getLevels } from '../data/levels'
import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'
import { useSEO } from '../hooks/useSEO'

export default function Home() {
  const { earnedTreasures, hasProgress } = useGame()
  const { lang } = useLang()
  const t = getUi(lang)
  const content = getContent(lang)
  const levels = getLevels(lang)

  useSEO({
    title: t.titles.home,
    description: lang === 'en'
      ? 'Interactive story game for primary school children (grades 4–6) to learn media and information literacy, digital safety, and online wisdom. 100% free and safe.'
      : 'Permainan cerita interaktif literasi media dan informasi untuk siswa SD kelas 4–6. Jelajahi Hutan Internet bersama Arif dan Safira, taklukkan 15 tantangan keamanan digital, dan raih sertifikat gratis.',
    keywords: [
      'literasi digital anak sd',
      'game edukasi anak sd',
      'petualangan hutan internet',
      'arif dan safira',
      'keamanan internet anak',
      'media pembelajaran interaktif sd',
      'unesco youth hackathon 2026',
    ],
    ogImage: '/og-image.png',
    lang,
  })

  return (
    <>
      <Hero />

      {/* --- Apa yang dipelajari anak --- */}
      <section className="section container" aria-labelledby="belajar-apa">
        <h2 id="belajar-apa">{t.home.learnTitle}</h2>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--ink-soft)' }}>{t.home.learnSub}</p>

        <div className="grid grid--3" style={{ marginTop: 'var(--sp-5)' }}>
          {content.learningPoints.map((point) => (
            <article className="card" key={point.title}>
              <span style={{ fontSize: '2rem' }} aria-hidden="true">
                {point.emoji}
              </span>
              <h3 style={{ marginTop: 'var(--sp-2)' }}>{point.title}</h3>
              <p style={{ marginBottom: 0, color: 'var(--ink-soft)' }}>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* --- Lima tempat di Hutan Internet --- */}
      <section className="section container" aria-labelledby="lima-tempat">
        <h2 id="lima-tempat">{t.home.placesTitle}</h2>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--ink-soft)' }}>{t.home.placesSub}</p>

        <div className="grid grid--5" style={{ marginTop: 'var(--sp-5)' }}>
          {levels.map((level) => {
            const found = earnedTreasures.some((treasure) => treasure.levelId === level.id)
            return (
              <article className="card" key={level.id}>
                <span className="card__eyebrow">
                  {t.home.levelLabel} {level.id}
                </span>
                <h3 style={{ fontSize: 'var(--text-lg)' }}>{level.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>{level.summary}</p>
                <p style={{ marginBottom: 0, fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  <span aria-hidden="true">{level.treasure.symbol}</span> {level.treasure.name}
                  {found && <span className="sr-only"> {t.home.treasureFound}</span>}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* --- Cara bermain --- */}
      <section
        className="section container"
        id="cara-bermain"
        aria-labelledby="cara-bermain-judul"
        tabIndex={-1}
      >
        <div className="card card--paper">
          <h2 id="cara-bermain-judul">{t.home.howTitle}</h2>
          <p style={{ color: 'var(--ink-soft)' }}>{t.home.howIntro}</p>

          <ol className="grid grid--3" style={{ listStyle: 'none', padding: 0, marginTop: 'var(--sp-5)' }}>
            {content.howToPlaySteps.map((step) => (
              <li key={step.step} className="card" style={{ background: 'var(--cream-100)' }}>
                <span className="card__eyebrow">
                  {t.home.stepLabel} {step.step}
                </span>
                <h3 style={{ fontSize: 'var(--text-lg)' }}>
                  <span aria-hidden="true">{step.emoji}</span> {step.title}
                </h3>
                <p style={{ marginBottom: 0, color: 'var(--ink-soft)', fontSize: 'var(--text-sm)' }}>
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: 'var(--sp-5)' }}>
            <GuideBubble mood="point" tone="warm">
              {t.home.pikoHow}
            </GuideBubble>
          </div>

          <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
            <Link className="btn btn--accent btn--lg" to={hasProgress ? '/main' : '/mulai'}>
              {hasProgress ? t.hero.continue : t.hero.primary}
            </Link>
          </div>
        </div>
      </section>

      {/* --- Untuk guru dan orang tua --- */}
      <section className="section container" aria-labelledby="guru-ortu">
        <h2 id="guru-ortu">{t.home.adultsTitle}</h2>
        <div className="grid grid--2" style={{ marginTop: 'var(--sp-4)' }}>
          <article className="card card--raised">
            <span style={{ fontSize: '2rem' }} aria-hidden="true">
              👩‍🏫
            </span>
            <h3>{t.home.teacherCardTitle}</h3>
            <p style={{ color: 'var(--ink-soft)' }}>{t.home.teacherCardText}</p>
            <Link className="btn btn--primary" to="/guru">
              {t.home.teacherCardBtn}
            </Link>
          </article>

          <article className="card card--raised">
            <span style={{ fontSize: '2rem' }} aria-hidden="true">
              👨‍👩‍👧
            </span>
            <h3>{t.home.parentCardTitle}</h3>
            <p style={{ color: 'var(--ink-soft)' }}>{t.home.parentCardText}</p>
            <Link className="btn btn--primary" to="/orang-tua">
              {t.home.parentCardBtn}
            </Link>
          </article>
        </div>
      </section>

      {/* --- Akses terbuka & privasi --- */}
      <section className="section container" aria-labelledby="akses-terbuka">
        <div className="card card--paper">
          <h2 id="akses-terbuka">{t.home.openTitle}</h2>
          <p>{t.home.openText}</p>
          <PrivacyNotice />
        </div>
      </section>
    </>
  )
}
