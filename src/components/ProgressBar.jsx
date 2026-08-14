/* Bilah kemajuan yang bisa dibaca pembaca layar.
 * Informasi tidak hanya lewat warna — selalu ada angka dan teks. */
export default function ProgressBar({ value, max, label, sublabel, tone = 'leaf' }) {
  const safeMax = max > 0 ? max : 1
  const percent = Math.min(100, Math.round((value / safeMax) * 100))

  return (
    <div className="progress">
      <div className="progress__row">
        <span>{label}</span>
        {sublabel && <span>{sublabel}</span>}
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}${sublabel ? `, ${sublabel}` : ''}`}
      >
        <div
          className={`progress__fill ${tone === 'sun' ? 'progress__fill--sun' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
