import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Tombol pilihan berukuran besar agar mudah ditekan jari anak.
 * Setelah dijawab, tombol dikunci tetapi tetap terbaca, dan pilihan
 * paling bijak selalu ditandai supaya anak tahu jawabannya. */
const LETTERS = ['A', 'B', 'C', 'D']

export default function ChoiceButton({ choice, index, onSelect, picked, revealed, isBest }) {
  const { lang } = useLang()
  const t = getUi(lang)

  const isPicked = picked === choice.id
  const toneClass = isPicked ? `choice--picked choice--${choice.tone}` : ''
  const revealClass = revealed && !isPicked && isBest ? 'choice--reveal' : ''

  let mark = null
  if (isPicked) mark = choice.tone === 'best' ? '⭐' : choice.tone === 'partial' ? '👍' : '💭'
  else if (revealed && isBest) mark = '⭐'

  return (
    <li>
      <button
        type="button"
        className={`choice ${toneClass} ${revealClass}`}
        onClick={() => onSelect(choice)}
        disabled={revealed}
        aria-describedby={revealed ? 'umpan-balik' : undefined}
      >
        <span className="choice__key" aria-hidden="true">
          {LETTERS[index]}
        </span>
        <span>{choice.label}</span>
        {mark && (
          <span className="choice__mark" aria-hidden="true">
            {mark}
          </span>
        )}
        {isPicked && <span className="sr-only">{t.choice.yours}</span>}
        {revealed && !isPicked && isBest && <span className="sr-only">{t.choice.best}</span>}
      </button>
    </li>
  )
}
