import { useCallback, useRef } from 'react'
import { useGame } from '../context/GameContext'

/* ===========================================================================
 * SUARA
 * ===========================================================================
 * Belum ada berkas audio yang disertakan, jadi nada dibuat langsung dengan
 * Web Audio API. Suara hanya berbunyi kalau pemain menyalakannya sendiri
 * (bawaannya mati).
 *
 * MENAMBAHKAN NARASI NANTI:
 *   1. Simpan berkas audio di public/audio/, mis. public/audio/l1-s1.mp3
 *   2. Tambahkan properti `audio: 'audio/l1-s1.mp3'` pada skenario terkait
 *      di src/data/levels.js
 *   3. Panggil playNarration(scenario.audio) dari komponen StoryCard.
 * ======================================================================== */

const TONES = {
  /* [frekuensi Hz, lama detik] */
  tap: [520, 0.07],
  best: [880, 0.16],
  partial: [660, 0.14],
  unsafe: [330, 0.16],
  reveal: [740, 0.24],
}

export function useSound() {
  const { soundOn } = useGame()
  const contextRef = useRef(null)
  const narrationRef = useRef(null)

  const play = useCallback(
    (name = 'tap') => {
      if (!soundOn) return
      const [frequency, duration] = TONES[name] ?? TONES.tap
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        if (!contextRef.current) contextRef.current = new AudioCtx()
        const ctx = contextRef.current
        if (ctx.state === 'suspended') ctx.resume()

        const oscillator = ctx.createOscillator()
        const gain = ctx.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
        oscillator.connect(gain).connect(ctx.destination)
        oscillator.start()
        oscillator.stop(ctx.currentTime + duration + 0.02)
      } catch {
        /* Perangkat tidak mendukung audio — permainan tetap berjalan. */
      }
    },
    [soundOn],
  )

  /* Siap dipakai kalau berkas narasi ditambahkan nanti. */
  const playNarration = useCallback(
    (src) => {
      if (!soundOn || !src) return
      try {
        if (narrationRef.current) narrationRef.current.pause()
        const audio = new Audio(`${import.meta.env.BASE_URL}${src}`)
        narrationRef.current = audio
        audio.play().catch(() => {})
      } catch {
        /* diabaikan */
      }
    },
    [soundOn],
  )

  const stopNarration = useCallback(() => {
    if (narrationRef.current) {
      narrationRef.current.pause()
      narrationRef.current = null
    }
  }, [])

  return { play, playNarration, stopNarration }
}
