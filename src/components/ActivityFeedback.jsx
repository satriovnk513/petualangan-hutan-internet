import { characterArt } from '../utils/assets'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Umpan balik untuk scene memasangkan dan drag-and-drop.
 * Bentuknya sama persis dengan FeedbackPanel pilihan ganda supaya anak
 * tidak merasa berpindah ke permainan lain.
 *
 *   tone 'best'  -> semua tepat pada percobaan pertama (10 poin)
 *   tone 'fixed' -> anak memperbaiki sendiri sampai tepat (0 poin, tetap hangat)
 *
 * Tidak ada kata "salah" atau "gagal" di mana pun. */
const ICONS = {
  best: '⭐',
  fixed: '👍',
}

export default function ActivityFeedback({ scenario, result }) {
  const { lang } = useLang()
  const t = getUi(lang)
  const tone = result.tone
  const title = result.firstTry ? t.activity.titleFirstTry : t.activity.titleAfterFix

  return (
    <section
      className={`feedback feedback--${tone}`}
      id="umpan-balik"
      aria-live="polite"
      tabIndex={-1}
    >
      <div className="feedback__head">
        <span className="feedback__icon" aria-hidden="true">
          {ICONS[tone] ?? '👍'}
        </span>
        <h3 className="feedback__title">{title}</h3>
        <span className="feedback__points">
          {t.feedback.points(result.points)}
          <span className="sr-only"> {t.feedback.pointsSr}</span>
        </span>
      </div>

      <p className="feedback__body">
        {result.firstTry ? t.activity.doneFirstTry : t.activity.doneAfterFix}
      </p>

      <div className="feedback__explain">
        <p>{scenario.explanation}</p>
      </div>

      <div className="tip">
        <span className="tip__icon" aria-hidden="true">
          <img src={characterArt.piko_happy} alt="" />
        </span>
        <div>
          <span className="tip__label">{t.feedback.tipLabel}</span>
          <p className="tip__text">{scenario.guardianTip}</p>
        </div>
      </div>
    </section>
  )
}
