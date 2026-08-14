import { getFeedbackLabels } from '../data/levels'
import { characterArt } from '../utils/assets'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Umpan balik setelah anak memilih.
 * Tidak memakai kata "benar" atau "salah". Akibat pilihan dijelaskan
 * dengan tenang, lalu ditutup dengan satu Tip dari Piko. */
const ICONS = {
  best: '⭐',
  partial: '👍',
  unsafe: '💭',
}

export default function FeedbackPanel({ scenario, choice, children }) {
  const { lang } = useLang()
  const t = getUi(lang)
  const labels = getFeedbackLabels(lang)

  const tone = choice.tone
  const bestChoice = scenario.choices.find((c) => c.id === scenario.bestChoiceId)
  const showBest = tone !== 'best'

  return (
    <section
      className={`feedback feedback--${tone}`}
      id="umpan-balik"
      aria-live="polite"
      tabIndex={-1}
    >
      <div className="feedback__head">
        <span className="feedback__icon" aria-hidden="true">
          {ICONS[tone]}
        </span>
        <h3 className="feedback__title">{labels[tone]}</h3>
        <span className="feedback__points">
          {t.feedback.points(choice.points)}
          <span className="sr-only"> {t.feedback.pointsSr}</span>
        </span>
      </div>

      <p className="feedback__body">{choice.feedback}</p>

      {showBest && bestChoice && (
        <div className="feedback__explain">
          <p>
            <strong>{t.feedback.safest}</strong> {bestChoice.label}.
          </p>
          <p>{scenario.explanation}</p>
        </div>
      )}

      {!showBest && (
        <div className="feedback__explain">
          <p>{scenario.explanation}</p>
        </div>
      )}

      <div className="tip">
        <span className="tip__icon" aria-hidden="true">
          <img src={characterArt.piko_happy} alt="" />
        </span>
        <div>
          <span className="tip__label">{t.feedback.tipLabel}</span>
          <p className="tip__text">{scenario.guardianTip}</p>
        </div>
      </div>

      {children}
    </section>
  )
}
