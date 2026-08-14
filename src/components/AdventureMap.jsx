import { useNavigate } from 'react-router-dom'
import MapNode from './MapNode'
import ProgressBar from './ProgressBar'
import { getLevels } from '../data/levels'
import { useGame } from '../context/GameContext'
import { useSound } from '../hooks/useSound'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Peta petualangan: lima tempat yang terbuka berurutan,
 * lengkap dengan harta karun dan lencana yang sudah ditemukan. */
export default function AdventureMap() {
  const navigate = useNavigate()
  const { isLevelUnlocked, isLevelComplete, levelScore, earnedTreasures, nextLevelId } = useGame()
  const { play } = useSound()
  const { lang } = useLang()
  const t = getUi(lang)

  const levels = getLevels(lang)
  const found = earnedTreasures.length

  const open = (level) => {
    play('tap')
    navigate(`/main/${level.id}`)
  }

  return (
    <div className="map">
      <div className="map__decor" aria-hidden="true">
        <svg viewBox="0 0 400 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M60 40 q40 60 -10 120 q-40 60 10 130 q40 70 -6 140 q-30 90 6 160"
            stroke="#9fd9bd"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 22"
          />
          <path
            d="M340 20 q-40 70 8 130 q42 60 -6 130 q-40 70 4 150"
            stroke="#ffd166"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 24"
          />
        </svg>
      </div>

      <div className="stack" style={{ position: 'relative', marginBottom: 'var(--sp-5)' }}>
        <ProgressBar
          value={found}
          max={levels.length}
          label={t.map.progressLabel(found)}
          sublabel={`${found * 20}%`}
          tone="sun"
        />
        <div className="treasure-track" aria-hidden="true">
          {levels.map((level) => {
            const done = isLevelComplete(level.id)
            return (
              <span key={level.id} className={`treasure-dot ${done ? 'treasure-dot--on' : ''}`}>
                {level.treasure.symbol}
              </span>
            )
          })}
        </div>
      </div>

      <ol className="map__nodes">
        {levels.map((level) => (
          <MapNode
            key={level.id}
            level={level}
            unlocked={isLevelUnlocked(level.id)}
            complete={isLevelComplete(level.id)}
            current={level.id === nextLevelId}
            score={levelScore(level.id)}
            onOpen={open}
          />
        ))}
      </ol>
    </div>
  )
}
