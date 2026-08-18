import { Link } from 'react-router-dom'
import BadgeCard from '../components/BadgeCard'
import TreasureCard from '../components/TreasureCard'
import Confetti from '../components/Confetti'
import GuideBubble from '../components/GuideBubble'
import ProgressBar from '../components/ProgressBar'
import ResetProgressButton from '../components/ResetProgressButton'
import { characterArt } from '../utils/assets'
import { getLevels, getResultTier } from '../data/levels'
import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'
import { useSEO } from '../hooks/useSEO'

export default function Results() {
  const {
    score,
    maxScore,
    percentage,
    earnedBadges,
    earnedTreasures,
    allComplete,
    isLevelComplete,
    levelScore,
    answeredCount,
    totalScenarios,
  } = useGame()
  const { lang } = useLang()
  const t = getUi(lang)
  const levels = getLevels(lang)

  useSEO({
    title: t.titles.results,
    description: lang === 'en'
      ? 'Adventure results and achievements in the Internet Forest digital literacy game.'
      : 'Hasil petualangan dan perolehan lencana literasi media & keamanan digital di Hutan Internet.',
    lang,
  })

  const tier = getResultTier(percentage, lang)

  /* Belum semua level selesai: tampilkan ringkasan sementara, bukan halaman kosong. */
  if (!allComplete) {
    return (
      <div className="container container--narrow section">
        <div className="page-head">
          <span className="page-head__eyebrow">
            <span aria-hidden="true">📊</span> {t.results.eyebrowPartial}
          </span>
          <h1>{t.results.partialTitle}</h1>
          <p>{t.results.partialBody(answeredCount, totalScenarios, earnedTreasures.length)}</p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--sp-5)' }}>
          <ProgressBar
            value={score}
            max={maxScore}
            label={t.results.partialScore}
            sublabel={t.level.scorePoints(score, maxScore)}
          />
        </div>

        <div className="grid grid--5" style={{ marginBottom: 'var(--sp-5)' }}>
          {levels.map((level) => (
            <BadgeCard key={level.id} badge={level.badge} earned={isLevelComplete(level.id)} />
          ))}
        </div>

        <GuideBubble mood="point">
          {t.results.pikoPartial(levels.length - earnedTreasures.length)}
        </GuideBubble>

        <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
          <Link className="btn btn--accent btn--lg" to="/main">
            {t.results.continueBtn}
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/">
            {t.results.homeBtn}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container section">
      <div className="celebrate" style={{ marginBottom: 'var(--sp-6)' }}>
        <Confetti pieces={34} />
        <span className="celebrate__medal" aria-hidden="true">
          🏅
        </span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>{t.results.title}</h1>
        <p style={{ fontSize: 'var(--text-lg)', maxWidth: '58ch' }}>{t.results.body}</p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 'var(--sp-2)',
            height: '160px',
            marginBottom: 'var(--sp-4)',
          }}
        >
          <img
            src={characterArt.arif_happy}
            alt=""
            aria-hidden="true"
            style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
          />
          <img
            src={characterArt.piko_happy}
            alt=""
            aria-hidden="true"
            style={{ height: '72%', width: 'auto', objectFit: 'contain' }}
          />
          <img
            src={characterArt.safira_happy}
            alt=""
            aria-hidden="true"
            style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* --- Skor --- */}
      <section className="section--tight" aria-labelledby="skor-judul">
        <h2 id="skor-judul">{t.results.resultTitle}</h2>

        <div
          style={{
            display: 'grid',
            gap: 'var(--sp-5)',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'center',
          }}
        >
          <div className="card card--paper" style={{ display: 'grid', gap: 'var(--sp-5)' }}>
            <div className="score-ring" style={{ '--pct': percentage }}>
              <span className="score-ring__value">
                <span className="score-ring__num">{percentage}%</span>
                <span className="score-ring__label">{t.results.wiseChoices}</span>
              </span>
            </div>

            <div className="stat-row">
              <div className="stat">
                <span className="stat__num">{score}</span>
                <span className="stat__label">{t.results.pointsOf(maxScore)}</span>
              </div>
              <div className="stat">
                <span className="stat__num">{earnedBadges.length}</span>
                <span className="stat__label">{t.results.badges}</span>
              </div>
              <div className="stat">
                <span className="stat__num">{earnedTreasures.length}</span>
                <span className="stat__label">{t.results.treasures}</span>
              </div>
            </div>

            <div className="notice notice--warm">
              <span className="notice__icon" aria-hidden="true">
                {tier.emoji}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'var(--text-xl)',
                    marginBottom: 'var(--sp-1)',
                  }}
                >
                  {tier.title}
                </p>
                <p style={{ marginBottom: 0 }}>{tier.message}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Rincian tiap tempat --- */}
      <section className="section--tight" aria-labelledby="rincian-judul">
        <h2 id="rincian-judul">{t.results.perPlace}</h2>
        <div className="grid grid--5">
          {levels.map((level) => (
            <div className="card" key={level.id}>
              <span className="card__eyebrow">
                {t.home.levelLabel} {level.id}
              </span>
              <h3 style={{ fontSize: 'var(--text-base)' }}>{level.title}</h3>
              <p style={{ marginBottom: 0, fontWeight: 800, color: 'var(--forest-800)' }}>
                {levelScore(level.id)} / 30
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Lencana --- */}
      <section className="section--tight" aria-labelledby="lencana-hasil">
        <h2 id="lencana-hasil">{t.results.badgesTitle}</h2>
        <div className="grid grid--5">
          {levels.map((level) => (
            <BadgeCard key={level.id} badge={level.badge} earned />
          ))}
        </div>
      </section>

      {/* --- Harta karun --- */}
      <section className="section--tight" aria-labelledby="harta-hasil">
        <h2 id="harta-hasil">{t.results.treasuresTitle}</h2>
        <div className="grid grid--5">
          {levels.map((level) => (
            <TreasureCard key={level.id} treasure={level.treasure} found />
          ))}
        </div>
      </section>

      <GuideBubble mood="happy" tone="warm">
        {t.results.pikoThanks}
      </GuideBubble>

      <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
        <Link className="btn btn--accent btn--lg" to="/sertifikat">
          <span aria-hidden="true">📜</span> {t.results.certBtn}
        </Link>
        <Link className="btn btn--primary btn--lg" to="/main">
          {t.results.replayBtn}
        </Link>
        <Link className="btn btn--ghost btn--lg" to="/">
          {t.results.homeBtn}
        </Link>
      </div>

      <p style={{ marginTop: 'var(--sp-5)', color: 'var(--ink-soft)', fontSize: 'var(--text-sm)' }}>
        {t.results.resetLead}
      </p>
      <ResetProgressButton label={t.reset.fromResults} />
    </div>
  )
}
