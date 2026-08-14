import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AdventureMap from '../components/AdventureMap'
import BadgeCard from '../components/BadgeCard'
import CharacterAvatar from '../components/CharacterAvatar'
import GuideBubble from '../components/GuideBubble'
import { getLevels } from '../data/levels'
import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Halaman peta: pusat permainan. */
export default function MapPage() {
  const { character, score, maxScore, earnedBadges, allComplete, seenIntro, isLevelComplete } =
    useGame()
  const { lang } = useLang()
  const t = getUi(lang)
  const levels = getLevels(lang)

  useEffect(() => {
    document.title = t.titles.map
  }, [t])

  /* Pemain baru diarahkan ke cerita pembuka dulu. */
  if (!seenIntro && !character) return <Navigate to="/mulai" replace />

  const name = character === 'safira' ? 'Safira' : 'Arif'

  return (
    <div className="container section">
      <div className="page-head">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">🗺️</span> {t.map.eyebrow}
        </span>
        <h1>{t.map.title}</h1>
        <p>{t.map.description}</p>
      </div>

      {/* Ringkasan pemain */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-4)',
          flexWrap: 'wrap',
          marginBottom: 'var(--sp-5)',
        }}
      >
        {character && <CharacterAvatar character={character} mood="happy" size="md" />}
        <div style={{ minWidth: '180px' }}>
          <strong
            style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}
          >
            {character ? t.map.playingWith(name) : t.map.noCharacter}
          </strong>
          <span style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-sm)' }}>
            {t.map.tempScore(score, maxScore)}
          </span>
        </div>
        <Link className="btn btn--ghost" to="/pilih-tokoh" style={{ marginLeft: 'auto' }}>
          {character ? t.map.changeFriend : t.map.pickFriend}
        </Link>
      </div>

      <AdventureMap />

      {allComplete && (
        <div className="notice notice--warm" style={{ marginTop: 'var(--sp-5)' }}>
          <span className="notice__icon" aria-hidden="true">
            🎉
          </span>
          <div>
            <p>
              <strong>{t.map.completeLead}</strong> {t.map.completeBody}
            </p>
            <div className="btn-row" style={{ marginBottom: 0 }}>
              <Link className="btn btn--accent" to="/hasil">
                {t.map.seeResults}
              </Link>
              <Link className="btn btn--ghost" to="/sertifikat">
                {t.map.openCertificate}
              </Link>
            </div>
          </div>
        </div>
      )}

      <section className="section--tight" aria-labelledby="lencana-judul">
        <h2 id="lencana-judul">{t.map.badgesTitle}</h2>
        <p style={{ color: 'var(--ink-soft)' }}>{t.map.badgesCount(earnedBadges.length, levels.length)}</p>
        <div className="grid grid--5">
          {levels.map((level) => (
            <BadgeCard key={level.id} badge={level.badge} earned={isLevelComplete(level.id)} />
          ))}
        </div>
      </section>

      <GuideBubble mood="point">{t.map.pikoMap}</GuideBubble>
    </div>
  )
}
