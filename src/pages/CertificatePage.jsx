import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Certificate from '../components/Certificate'
import GuideBubble from '../components/GuideBubble'
import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Halaman sertifikat.
 * Nama hanya disimpan di localStorage perangkat ini
 * dan tidak pernah dikirim ke mana pun. */
export default function CertificatePage() {
  const { certificateName, setCertificateName, percentage, allComplete, earnedTreasures } = useGame()
  const [draft, setDraft] = useState(certificateName)
  const { lang } = useLang()
  const t = getUi(lang)

  useEffect(() => {
    document.title = t.titles.certificate
  }, [t])

  useEffect(() => setDraft(certificateName), [certificateName])

  /* Tanggal dibuat di perangkat pemain dan mengikuti bahasa yang dipilih:
   * id -> "7 Agustus 2026", en -> "7 August 2026". */
  const dateText = new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const save = (event) => {
    event.preventDefault()
    setCertificateName(draft.trim().slice(0, 28))
  }

  return (
    <div className="container section">
      <div className="page-head no-print">
        <span className="page-head__eyebrow">
          <span aria-hidden="true">📜</span> {t.cert.eyebrow}
        </span>
        <h1>{t.cert.pageTitle}</h1>
        <p>{t.cert.pageSub}</p>
      </div>

      {!allComplete && (
        <div className="notice notice--warm no-print" style={{ marginBottom: 'var(--sp-5)' }}>
          <span className="notice__icon" aria-hidden="true">
            🌱
          </span>
          <div>
            <p>
              <strong>{t.cert.incompleteLead}</strong> {t.cert.incompleteBody(earnedTreasures.length)}
            </p>
            <p style={{ marginBottom: 0 }}>
              <Link className="btn btn--accent" to="/main">
                {t.cert.continueBtn}
              </Link>
            </p>
          </div>
        </div>
      )}

      <div className="cert-wrap">
        <form className="name-field no-print" onSubmit={save}>
          <label htmlFor="nama-sertifikat">{t.cert.nameLabel}</label>
          <input
            id="nama-sertifikat"
            type="text"
            value={draft}
            maxLength={28}
            placeholder={t.cert.namePlaceholder}
            autoComplete="off"
            onChange={(event) => setDraft(event.target.value)}
            onBlur={save}
          />
          <p className="name-field__hint">{t.cert.nameHint}</p>
          <button type="submit" className="btn btn--ghost">
            {t.cert.nameSave}
          </button>
        </form>

        <Certificate name={certificateName} dateText={dateText} percentage={percentage} />

        <div className="btn-row no-print">
          <button type="button" className="btn btn--accent btn--lg" onClick={() => window.print()}>
            <span aria-hidden="true">🖨️</span> {t.cert.print}
          </button>
          <Link className="btn btn--ghost btn--lg" to="/hasil">
            {t.cert.backResults}
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/">
            {t.cert.backHome}
          </Link>
        </div>

        <div className="notice no-print">
          <span className="notice__icon" aria-hidden="true">
            💡
          </span>
          <div>
            <p>
              <strong>{t.cert.pdfHowLead}</strong> {t.cert.pdfHow}
            </p>
            <p style={{ marginBottom: 0 }}>{t.cert.pdfMobile}</p>
          </div>
        </div>

        <div className="no-print">
          <GuideBubble mood="happy" tone="warm">
            {t.cert.pikoCert}
          </GuideBubble>
        </div>
      </div>
    </div>
  )
}
