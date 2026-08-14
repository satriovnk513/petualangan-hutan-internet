import { Link } from 'react-router-dom'
import ResetProgressButton from './ResetProgressButton'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

export default function Footer() {
  const year = new Date().getFullYear()
  const { lang } = useLang()
  const t = getUi(lang)

  return (
    <footer className="footer no-print">
      <svg className="footer__wave" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 46 C 180 6, 320 6, 480 26 C 660 48, 820 8, 1000 20 C 1160 30, 1300 46, 1440 30 L1440 46 Z"
          fill="#14523a"
        />
      </svg>

      <div className="container">
        <div className="footer__grid">
          <div>
            <h3>
              {lang === 'id'
                ? 'Petualangan Arif & Safira di Hutan Internet'
                : "Arif & Safira's Adventure in the Internet Forest"}
            </h3>
            <p style={{ color: '#cfe6d9' }}>{t.footer.description}</p>
            <p style={{ color: '#cfe6d9', marginBottom: 0 }}>{t.footer.disclaimer}</p>
          </div>

          <nav aria-label={t.footer.ariaPages}>
            <h3>{t.footer.exploreTitle}</h3>
            <ul className="footer__list">
              <li>
                <Link to="/">{t.footer.home}</Link>
              </li>
              <li>
                <Link to="/mulai">{t.footer.start}</Link>
              </li>
              <li>
                <Link to="/main">{t.footer.map}</Link>
              </li>
              <li>
                <Link to="/ruang-belajar">{t.footer.library}</Link>
              </li>
              <li>
                <Link to="/hasil">{t.footer.results}</Link>
              </li>
              <li>
                <Link to="/sertifikat">{t.footer.certificate}</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.ariaInfo}>
            <h3>{t.footer.infoTitle}</h3>
            <ul className="footer__list">
              <li>
                <Link to="/guru">{t.footer.teachers}</Link>
              </li>
              <li>
                <Link to="/orang-tua">{t.footer.parents}</Link>
              </li>
              <li>
                <Link to="/tentang">{t.footer.aboutProject}</Link>
              </li>
              <li>
                <Link to="/privasi">{t.footer.privacy}</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {t.footer.license}
          </p>
          <ResetProgressButton className="btn btn--quiet" />
        </div>
      </div>
    </footer>
  )
}
