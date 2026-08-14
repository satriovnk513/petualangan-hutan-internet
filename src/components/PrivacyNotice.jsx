import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Pernyataan singkat privasi yang muncul di beberapa halaman. */
export default function PrivacyNotice({ compact = false }) {
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <div className="notice notice--leaf">
      <span className="notice__icon" aria-hidden="true">
        🛡️
      </span>
      <div>
        <p>
          <strong>{t.privacyNotice.lead}</strong> {t.privacyNotice.body}
        </p>
        {!compact && (
          <p style={{ marginBottom: 0 }}>
            <Link to="/privasi">{t.privacyNotice.link}</Link>
          </p>
        )}
      </div>
    </div>
  )
}
