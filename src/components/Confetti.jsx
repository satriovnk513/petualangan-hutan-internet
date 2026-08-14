import { useMemo } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const COLORS = ['#ffd166', '#52b788', '#4aa3df', '#ef8354', '#8b6cd8']

/* Hujan warna lembut saat pemain menyelesaikan level.
 * Otomatis dimatikan kalau perangkat meminta "kurangi gerakan". */
export default function Confetti({ pieces = 26 }) {
  const reduced = useReducedMotion()

  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        color: COLORS[i % COLORS.length],
        delay: `${(i % 10) * 0.16}s`,
        duration: `${2.6 + ((i * 7) % 18) / 10}s`,
        tilt: `${(i % 7) * 24}deg`,
      })),
    [pieces],
  )

  if (reduced) return null

  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((bit) => (
        <i
          key={bit.id}
          style={{
            left: bit.left,
            background: bit.color,
            animationDelay: bit.delay,
            animationDuration: bit.duration,
            transform: `rotate(${bit.tilt})`,
          }}
        />
      ))}
    </div>
  )
}
