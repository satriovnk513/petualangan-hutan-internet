import SceneArt from './SceneArt'
import ChoiceButton from './ChoiceButton'
import { characterArt, sceneConfig } from '../utils/assets'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Satu adegan cerita: gambar, cerita pendek, lalu bagian menjawab.
 *
 * Bagian menjawab bisa berupa:
 *   - daftar pilihan ganda (bawaan, kalau `children` tidak diisi), atau
 *   - aktivitas memasangkan / drag-and-drop yang dikirim lewat `children`.
 * Bagian gambar, judul, dan cerita selalu sama supaya rasa permainannya utuh. */
const TYPE_ICON = {
  choice: '📝',
  match: '🔗',
  sort: '🧩',
}

export default function StoryCard({
  scenario,
  levelTitle,
  stepLabel,
  picked,
  revealed,
  onSelect,
  children,
}) {
  const config = sceneConfig[scenario.image] ?? { art: 'gate', figure: 'piko_happy' }
  const figureSrc = characterArt[config.figure]
  const { lang } = useLang()
  const t = getUi(lang)
  const type = scenario.type ?? 'choice'

  return (
    <div className="story">
      <div className="scene">
        <SceneArt variant={config.art} />
        {figureSrc && (
          <img className="scene__figure" src={figureSrc} alt={scenario.imageAlt} loading="lazy" />
        )}
        <span className="scene__label">{levelTitle}</span>
      </div>

      <div className="story__card">
        <div className="story__meta">
          <span className="pill">{stepLabel}</span>
          <span className="pill">
            <span aria-hidden="true">{TYPE_ICON[type]}</span> {t.level.typePill[type]}
          </span>
        </div>

        <h2 className="story__title">{scenario.title}</h2>
        <p className="story__text">{scenario.story}</p>

        {children ?? (
          <>
            <p className="story__question" id="pertanyaan">
              {t.level.question}
            </p>

            <ul className="choices" aria-labelledby="pertanyaan">
              {scenario.choices.map((choice, index) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  index={index}
                  picked={picked}
                  revealed={revealed}
                  isBest={choice.id === scenario.bestChoiceId}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
