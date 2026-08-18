import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import FeedbackPanel from '../components/FeedbackPanel'
import ActivityFeedback from '../components/ActivityFeedback'
import PlacementActivity from '../components/PlacementActivity'
import ProgressBar from '../components/ProgressBar'
import GuideBubble from '../components/GuideBubble'
import TreasureCard from '../components/TreasureCard'
import Confetti from '../components/Confetti'
import SceneArt from '../components/SceneArt'
import { getLevelById, getLevels, POINTS_PER_SCENE } from '../data/levels'
import { levelArt } from '../utils/assets'
import { makeSceneOrder, applyChoiceOrder, orderById } from '../utils/shuffle'
import { useGame } from '../context/GameContext'
import { useSound } from '../hooks/useSound'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'
import { useSEO } from '../hooks/useSEO'

/* ===========================================================================
 * SATU LEVEL
 * ===========================================================================
 * Alur tiap scene ada empat tahap:
 *   1. Cerita        -> StoryCard
 *   2. Keputusan     -> tombol pilihan, memasangkan, atau drag-and-drop
 *   3. Akibat        -> FeedbackPanel / ActivityFeedback
 *   4. Tip dari Piko -> bagian bawah kotak umpan balik
 * Anak selalu bisa lanjut, apa pun jawabannya.
 *
 * TIGA BENTUK SCENE (lihat `type` di src/data/levels.js):
 *   'choice' — pilihan ganda: satu jawaban tepat bernilai 10 poin.
 *   'match'  — memasangkan: 10 poin kalau seluruh pasangan tepat pada
 *              percobaan pertama, kalau belum 0 poin lalu boleh diperbaiki.
 *   'sort'   — drag-and-drop: penilaiannya sama dengan 'match'.
 *
 * Mengganti bahasa di tengah level aman: keadaan (scene ke berapa, pilihan
 * yang dipilih, kartu yang sudah diletakkan) disimpan sebagai id, bukan teks.
 * ======================================================================== */

const STAGE = { INTRO: 'intro', PLAY: 'play', DONE: 'done' }

export default function Level() {
  const { levelId } = useParams()
  const { play } = useSound()
  const { lang } = useLang()
  const t = getUi(lang)
  const {
    isLevelUnlocked,
    isLevelComplete,
    answerScenario,
    completeLevel,
    replayLevel,
    levelScore,
    nextLevelId,
  } = useGame()

  const level = getLevelById(levelId, lang)

  const [stage, setStage] = useState(STAGE.INTRO)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  /* Hasil scene memasangkan / drag-and-drop: { points, tone, firstTry }. */
  const [activityResult, setActivityResult] = useState(null)
  /* Urutan tampil pilihan/kartu per scene, disimpan sebagai id saja.
   * Lihat src/utils/shuffle.js untuk penjelasan lengkapnya. */
  const [sceneOrder, setSceneOrder] = useState(() => makeSceneOrder(level))
  const feedbackRef = useRef(null)

  /* Setiap pindah level, mulai lagi dari cerita pembuka level. */
  useEffect(() => {
    setStage(STAGE.INTRO)
    setIndex(0)
    setPicked(null)
    setActivityResult(null)
    setSceneOrder(makeSceneOrder(level))
    /* Sengaja hanya bergantung pada levelId, walaupun `level` ikut dibaca:
     * id scene, id pilihan, dan id kartu sama persis di kedua bahasa, jadi
     * berganti bahasa TIDAK BOLEH memicu pengacakan ulang di tengah soal. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId])

  useSEO({
    title: level ? t.titles.level(level.title) : 'Level',
    description: level?.summary || 'Tantangan petualangan Hutan Internet.',
    lang,
  })

  /* Setelah menjawab, arahkan fokus ke kotak umpan balik supaya
   * pengguna pembaca layar langsung mendengar hasilnya. */
  useEffect(() => {
    if ((picked || activityResult) && feedbackRef.current) feedbackRef.current.focus()
  }, [picked, activityResult])

  const totalSteps = level?.scenarios.length ?? 0

  /* Scene yang dipakai untuk menggambar layar: isinya sama persis dengan
   * data aslinya, hanya urutan pilihannya yang mengikuti hasil acakan. */
  const scenario = useMemo(() => {
    const source = level?.scenarios[index]
    return source ? applyChoiceOrder(source, sceneOrder) : undefined
  }, [level, index, sceneOrder])

  /* Kartu yang bisa diseret/diketuk, urutannya mengikuti hasil acakan.
   * Untuk 'match' kartunya adalah bagian kanan (tindakan), untuk 'sort'
   * kartunya adalah kartu yang harus masuk kategori. */
  const activityCards = useMemo(() => {
    if (!scenario) return []
    if (scenario.type === 'match') {
      return orderById(
        scenario.pairs.map((pair) => ({ id: pair.id, label: pair.right })),
        sceneOrder[scenario.id],
      )
    }
    if (scenario.type === 'sort') {
      return orderById(
        scenario.cards.map((card) => ({ id: card.id, label: card.label })),
        sceneOrder[scenario.id],
      )
    }
    return []
  }, [scenario, sceneOrder])

  const activityTargets = useMemo(() => {
    if (!scenario) return []
    if (scenario.type === 'match') {
      return scenario.pairs.map((pair) => ({ id: pair.id, label: pair.left }))
    }
    if (scenario.type === 'sort') {
      return scenario.categories.map((category) => ({
        id: category.id,
        label: category.label,
        icon: category.icon,
      }))
    }
    return []
  }, [scenario])

  /* Jawaban benar dalam bentuk { idKartu: idKotak }. */
  const activitySolution = useMemo(() => {
    if (!scenario) return {}
    if (scenario.type === 'match') {
      return Object.fromEntries(scenario.pairs.map((pair) => [pair.id, pair.id]))
    }
    if (scenario.type === 'sort') {
      return Object.fromEntries(scenario.cards.map((card) => [card.id, card.category]))
    }
    return {}
  }, [scenario])

  /* Dicari berdasarkan id, bukan posisi — jadi tetap benar setelah diacak. */
  const pickedChoice = useMemo(
    () => scenario?.choices?.find((choice) => choice.id === picked) ?? null,
    [scenario, picked],
  )

  if (!level) return <Navigate to="/main" replace />
  if (!isLevelUnlocked(level.id)) return <Navigate to="/main" replace />

  const isLast = index === totalSteps - 1
  const scoreThisLevel = levelScore(level.id)
  const answered = !!picked || !!activityResult

  const startLevel = () => {
    play('tap')
    /* Kalau level ini sudah pernah selesai, jawabannya dihapus dulu
     * supaya bisa dimainkan ulang dengan bersih. */
    if (isLevelComplete(level.id)) replayLevel(level.id)
    setIndex(0)
    setPicked(null)
    setActivityResult(null)
    /* Diacak ulang setiap kali level dimulai atau diulang, sehingga urutan
     * A-B-C dan susunan kartu tidak pernah sama persis dengan permainan
     * sebelumnya. */
    setSceneOrder(makeSceneOrder(level))
    setStage(STAGE.PLAY)
  }

  const choose = (choice) => {
    if (picked) return
    play(choice.tone)
    setPicked(choice.id)
    answerScenario(scenario.id, choice)
  }

  /* Percobaan PERTAMA-lah yang menentukan skor scene memasangkan dan
   * drag-and-drop: 10 poin kalau semuanya tepat, 0 kalau belum. Sesudah itu
   * anak tetap boleh memperbaiki sampai tepat supaya bisa melanjutkan. */
  const handleActivityFirstCheck = (allCorrect) => {
    answerScenario(scenario.id, {
      id: allCorrect ? 'first-try' : 'after-check',
      points: allCorrect ? POINTS_PER_SCENE : 0,
      tone: allCorrect ? 'best' : 'unsafe',
    })
  }

  const handleActivitySolved = (firstTry) => {
    play(firstTry ? 'best' : 'partial')
    setActivityResult({
      points: firstTry ? POINTS_PER_SCENE : 0,
      tone: firstTry ? 'best' : 'fixed',
      firstTry,
    })
  }

  const next = () => {
    play('tap')
    if (isLast) {
      completeLevel(level.id)
      setStage(STAGE.DONE)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIndex((current) => current + 1)
      setPicked(null)
      setActivityResult(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /* ---------------------------------------------------------------- INTRO */
  if (stage === STAGE.INTRO) {
    const alreadyDone = isLevelComplete(level.id)
    return (
      <div className="container container--narrow section">
        <div className="scene" style={{ marginBottom: 'var(--sp-5)' }}>
          <SceneArt variant={levelArt[level.id]} />
          <span className="scene__label">
            {t.level.levelWord} {level.id}
          </span>
        </div>

        {/* Urutannya sengaja: label level -> keterangan hadiah -> judul ->
         * cerita -> area tombol. Keterangan hadiah naik ke atas supaya tidak
         * lagi berdiri sejajar dengan tombol dan tersangka bisa diklik. */}
        <div className="card card--paper level-intro">
          <span className="card__eyebrow">
            {t.level.levelWord} {level.id} · {level.topic}
          </span>

          {/* Hadiah level: KETERANGAN, bukan tombol. Dibuat sebagai daftar
           * supaya pembaca layar juga membacanya sebagai informasi. Jangan
           * menambahkan onClick, tautan, atau tanda panah di sini. */}
          <ul className="reward-facts">
            <li className="reward-fact">
              <span className="reward-fact__icon" aria-hidden="true">
                {level.badge.emoji}
              </span>
              <span className="reward-fact__text">
                <span className="reward-fact__label">{t.level.badgeLabel}:</span>{' '}
                <span className="reward-fact__value">{level.badge.name}</span>
              </span>
            </li>
            <li className="reward-fact">
              <span className="reward-fact__icon" aria-hidden="true">
                {level.treasure.symbol}
              </span>
              <span className="reward-fact__text">
                <span className="reward-fact__label">{t.level.treasureLabel}:</span>{' '}
                <span className="reward-fact__value">{level.treasure.name}</span>
              </span>
            </li>
          </ul>

          <h1 className="level-intro__title">{level.title}</h1>
          <p className="level-intro__story">{level.intro}</p>

          {alreadyDone && (
            <p className="level-intro__status">{t.level.alreadyDone(scoreThisLevel)}</p>
          )}

          {/* Satu-satunya area yang boleh terlihat seperti tombol. */}
          <div className="level-intro__actions btn-row">
            <button type="button" className="btn btn--accent btn--lg" onClick={startLevel}>
              {alreadyDone ? t.level.replay : t.level.enter(level.title)} →
            </button>
            <Link className="btn btn--ghost btn--lg" to="/main">
              {t.level.backToMap}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ----------------------------------------------------------------- DONE */
  if (stage === STAGE.DONE) {
    const followUp = getLevels(lang).find((l) => l.id === level.id + 1)
    return (
      <div className="container container--narrow section">
        <div className="celebrate">
          <Confetti />
          <span className="celebrate__medal" aria-hidden="true">
            {level.treasure.symbol}
          </span>
          <span className="card__eyebrow">{t.level.doneEyebrow(level.id)}</span>
          <h2>{t.level.doneTitle}</h2>
          <p style={{ fontSize: 'var(--text-lg)', maxWidth: '52ch' }}>
            {t.level.doneBody(level.badge.name, level.treasure.name, level.title)}
          </p>

          <div
            className="grid grid--2"
            style={{ maxWidth: '520px', margin: '0 auto var(--sp-5)', textAlign: 'left' }}
          >
            <div className="badge-card">
              <span className="badge-card__medal" aria-hidden="true">
                {level.badge.emoji}
              </span>
              <span className="badge-card__name">{level.badge.name}</span>
              <p className="badge-card__desc">{level.badge.description}</p>
            </div>
            <TreasureCard treasure={level.treasure} found />
          </div>

          <div style={{ maxWidth: '420px', margin: '0 auto var(--sp-5)' }}>
            <ProgressBar
              value={scoreThisLevel}
              max={totalSteps * 10}
              label={t.level.scoreHere}
              sublabel={t.level.scorePoints(scoreThisLevel, totalSteps * 10)}
            />
          </div>

          <div className="btn-row btn-row--center">
            {followUp ? (
              <Link className="btn btn--accent btn--lg" to={`/main/${followUp.id}`}>
                {t.level.goNext(followUp.title)} →
              </Link>
            ) : (
              <Link className="btn btn--accent btn--lg" to="/hasil">
                {t.level.goResults} →
              </Link>
            )}
            <Link className="btn btn--ghost btn--lg" to="/main">
              {t.level.backToMap}
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 'var(--sp-5)' }}>
          <GuideBubble mood="happy" tone="warm">
            {followUp ? t.level.pikoNext(followUp.title) : t.level.pikoAllDone}
          </GuideBubble>
        </div>

        {nextLevelId === null && <p className="sr-only">{t.level.srAllDone}</p>}
      </div>
    )
  }

  /* ----------------------------------------------------------------- PLAY */
  return (
    <div className="container container--narrow section">
      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <ProgressBar
          value={index + (answered ? 1 : 0)}
          max={totalSteps}
          label={`${t.level.levelWord} ${level.id} · ${level.title}`}
          sublabel={t.level.sceneOf(index + 1, totalSteps)}
        />
      </div>

      <StoryCard
        scenario={scenario}
        levelTitle={level.title}
        stepLabel={t.level.sceneOf(index + 1, totalSteps)}
        picked={picked}
        revealed={!!picked}
        onSelect={choose}
      >
        {scenario.type === 'choice' ? null : (
          <PlacementActivity
            /* Kunci memakai id scene saja, bukan bahasa: berganti bahasa
             * tidak boleh menghapus kartu yang sudah diletakkan anak. */
            key={scenario.id}
            variant={scenario.type}
            prompt={scenario.prompt}
            cards={activityCards}
            targets={activityTargets}
            solution={activitySolution}
            onFirstCheck={handleActivityFirstCheck}
            onSolved={handleActivitySolved}
            onRetry={() => play('tap')}
          />
        )}
      </StoryCard>

      {(pickedChoice || activityResult) && (
        <div style={{ marginTop: 'var(--sp-4)' }} ref={feedbackRef} tabIndex={-1}>
          {pickedChoice ? (
            <FeedbackPanel scenario={scenario} choice={pickedChoice} />
          ) : (
            <ActivityFeedback scenario={scenario} result={activityResult} />
          )}

          <div className="action-bar btn-row">
            <button type="button" className="btn btn--primary btn--lg btn--block" onClick={next}>
              {isLast ? t.level.finish : t.level.next} →
            </button>
          </div>
        </div>
      )}

      {!answered && (
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <GuideBubble mood="point">
            {scenario.type === 'choice' ? t.level.pikoThink : t.level.pikoActivity}
          </GuideBubble>
        </div>
      )}

      <p style={{ marginTop: 'var(--sp-5)' }}>
        <Link className="btn btn--quiet" to="/main">
          {t.level.backToMapNote}
        </Link>
      </p>
    </div>
  )
}
