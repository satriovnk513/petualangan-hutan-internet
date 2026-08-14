import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Pengalih bahasa ID | EN.
 * Mengganti bahasa tidak memuat ulang halaman dan tidak menyentuh
 * kemajuan permainan — hanya teksnya yang berganti. */
export default function LangToggle({ size = 'sm' }) {
  const { lang, setLang } = useLang()
  const t = getUi(lang)

  return (
    <div
      className={`lang-toggle ${size === 'lg' ? 'lang-toggle--lg' : ''}`}
      role="group"
      aria-label={t.nav.langAria}
    >
      <button
        type="button"
        className="lang-toggle__btn"
        aria-pressed={lang === 'id'}
        onClick={() => setLang('id')}
      >
        <span aria-hidden="true">ID</span>
        <span className="sr-only">{t.nav.langLabelId}</span>
      </button>
      <button
        type="button"
        className="lang-toggle__btn"
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        <span aria-hidden="true">EN</span>
        <span className="sr-only">{t.nav.langLabelEn}</span>
      </button>
    </div>
  )
}
