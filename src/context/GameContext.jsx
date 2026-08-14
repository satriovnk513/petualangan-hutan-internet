/* ===========================================================================
 * PENGELOLA KEMAJUAN PERMAINAN
 * ===========================================================================
 * Menyimpan: tokoh pilihan, jawaban tiap skenario, level yang sudah selesai,
 * lencana, harta karun, pengaturan suara, dan nama di sertifikat.
 * Semuanya hanya di localStorage perangkat pemain.
 * ======================================================================== */

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { levels, MAX_SCORE, TOTAL_SCENARIOS } from '../data/levels'
import { readState, writeState, clearState, isStorageAvailable } from '../utils/storage'

const GameContext = createContext(null)

const initialState = {
  /* 'arif' | 'safira' | null */
  character: null,
  /* { [scenarioId]: { choiceId, points, tone } } */
  answers: {},
  /* daftar id level yang sudah tuntas, mis. [1, 2] */
  completedLevels: [],
  /* nama panggilan untuk sertifikat — hanya tersimpan di perangkat */
  certificateName: '',
  /* efek suara, bawaannya mati */
  soundOn: false,
  /* penanda pemain pernah melihat cerita pembuka */
  seenIntro: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CHARACTER':
      return { ...state, character: action.payload }

    case 'SEEN_INTRO':
      return { ...state, seenIntro: true }

    case 'ANSWER': {
      const { scenarioId, choiceId, points, tone } = action.payload
      return {
        ...state,
        answers: { ...state.answers, [scenarioId]: { choiceId, points, tone } },
      }
    }

    case 'COMPLETE_LEVEL': {
      const id = action.payload
      if (state.completedLevels.includes(id)) return state
      return {
        ...state,
        completedLevels: [...state.completedLevels, id].sort((a, b) => a - b),
      }
    }

    case 'SET_CERTIFICATE_NAME':
      return { ...state, certificateName: action.payload }

    case 'TOGGLE_SOUND':
      return { ...state, soundOn: !state.soundOn }

    case 'RESET_LEVEL': {
      /* Menghapus jawaban satu level supaya bisa diulang. */
      const levelId = action.payload
      const level = levels.find((l) => l.id === levelId)
      if (!level) return state
      const answers = { ...state.answers }
      level.scenarios.forEach((scenario) => delete answers[scenario.id])
      return {
        ...state,
        answers,
        completedLevels: state.completedLevels.filter((id) => id !== levelId),
      }
    }

    case 'RESET_ALL':
      /* Pengaturan suara sengaja dipertahankan agar tidak mengejutkan pemain. */
      return { ...initialState, soundOn: state.soundOn }

    default:
      return state
  }
}

/* Kemajuan dibaca SEBELUM render pertama (bukan lewat useEffect), supaya
 * keadaan awal yang masih kosong tidak sempat menimpa data tersimpan. */
function loadInitialState() {
  const saved = readState()
  return saved ? { ...initialState, ...saved } : initialState
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  /* Simpan setiap kali ada perubahan. Penulisan pertama isinya sama
   * dengan yang baru saja dibaca, jadi aman. */
  useEffect(() => {
    writeState(state)
  }, [state])

  const actions = useMemo(
    () => ({
      chooseCharacter: (character) => dispatch({ type: 'SET_CHARACTER', payload: character }),
      markIntroSeen: () => dispatch({ type: 'SEEN_INTRO' }),
      answerScenario: (scenarioId, choice) =>
        dispatch({
          type: 'ANSWER',
          payload: {
            scenarioId,
            choiceId: choice.id,
            points: choice.points,
            tone: choice.tone,
          },
        }),
      completeLevel: (levelId) => dispatch({ type: 'COMPLETE_LEVEL', payload: levelId }),
      replayLevel: (levelId) => dispatch({ type: 'RESET_LEVEL', payload: levelId }),
      setCertificateName: (name) => dispatch({ type: 'SET_CERTIFICATE_NAME', payload: name }),
      toggleSound: () => dispatch({ type: 'TOGGLE_SOUND' }),
      resetAll: () => {
        clearState()
        dispatch({ type: 'RESET_ALL' })
      },
    }),
    [],
  )

  /* --- Nilai turunan ---------------------------------------------------- */

  const score = useMemo(
    () => Object.values(state.answers).reduce((total, answer) => total + (answer.points || 0), 0),
    [state.answers],
  )

  const answeredCount = Object.keys(state.answers).length
  const percentage = MAX_SCORE > 0 ? Math.round((score / MAX_SCORE) * 100) : 0

  /* Level terbuka kalau: level pertama, level sebelumnya sudah selesai,
   * atau level itu sendiri pernah diselesaikan. Syarat terakhir penting
   * supaya level yang sudah tuntas tidak ikut terkunci ketika pemain
   * mengulang level sebelumnya lalu berhenti di tengah jalan. */
  const isLevelUnlocked = useCallback(
    (levelId) =>
      levelId === 1 ||
      state.completedLevels.includes(levelId - 1) ||
      state.completedLevels.includes(levelId),
    [state.completedLevels],
  )

  const isLevelComplete = useCallback(
    (levelId) => state.completedLevels.includes(levelId),
    [state.completedLevels],
  )

  const levelScore = useCallback(
    (levelId) => {
      const level = levels.find((l) => l.id === levelId)
      if (!level) return 0
      return level.scenarios.reduce(
        (total, scenario) => total + (state.answers[scenario.id]?.points ?? 0),
        0,
      )
    },
    [state.answers],
  )

  const earnedBadges = useMemo(
    () =>
      levels
        .filter((level) => state.completedLevels.includes(level.id))
        .map((level) => ({ ...level.badge, levelId: level.id, levelTitle: level.title })),
    [state.completedLevels],
  )

  const earnedTreasures = useMemo(
    () =>
      levels
        .filter((level) => state.completedLevels.includes(level.id))
        .map((level) => ({ ...level.treasure, levelId: level.id, levelTitle: level.title })),
    [state.completedLevels],
  )

  const allComplete = state.completedLevels.length === levels.length

  /* Level berikutnya yang perlu dimainkan — dipakai tombol "lanjutkan". */
  const nextLevelId = useMemo(() => {
    const next = levels.find((level) => !state.completedLevels.includes(level.id))
    return next ? next.id : null
  }, [state.completedLevels])

  const hasProgress = answeredCount > 0 || state.completedLevels.length > 0 || !!state.character

  const value = {
    ...state,
    ...actions,
    score,
    maxScore: MAX_SCORE,
    percentage,
    answeredCount,
    totalScenarios: TOTAL_SCENARIOS,
    isLevelUnlocked,
    isLevelComplete,
    levelScore,
    earnedBadges,
    earnedTreasures,
    allComplete,
    nextLevelId,
    hasProgress,
    storageAvailable: isStorageAvailable(),
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame harus dipakai di dalam <GameProvider>')
  }
  return context
}
