import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LangToggle from './LangToggle'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Menu utama. Di ponsel dipakai menu tarik dengan tombol tutup yang jelas. */
export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { lang } = useLang()
  const t = getUi(lang)

  /* Menu mendatar di desktop sengaja hanya berisi tiga halaman pendamping.
   * Beranda dijangkau lewat logo, dan permainan lewat tombol utama di hero,
   * supaya tidak ada tombol yang berulang. */
  const navItems = [
    { to: '/guru', label: t.nav.teachers, emoji: '👩‍🏫' },
    { to: '/orang-tua', label: t.nav.parents, emoji: '👨‍👩‍👧' },
    { to: '/tentang', label: t.nav.about, emoji: '💡' },
  ]

  /* Di ponsel, menu tarik adalah satu-satunya navigasi, jadi isinya lengkap. */
  const menuItems = [
    { to: '/', label: t.nav.home, emoji: '🏡', end: true },
    { to: '/main', label: t.nav.play, emoji: '🌳' },
    ...navItems,
  ]

  /* Menu selalu tertutup setiap kali pindah halaman. */
  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <header className="header no-print">
        <div className="container header__inner">
          <Link className="header__brand" to="/">
            <svg className="header__mark" viewBox="0 0 64 64" role="img" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="#1c6b4a" />
              <path d="M32 12 L46 28 L32 54 L18 28 Z" fill="#ffd166" />
              <path d="M32 12 L46 28 L32 32 Z" fill="#fff1c9" />
              <path d="M18 28 L32 32 L32 54 Z" fill="#e08e0b" />
            </svg>
            <span className="header__title">
              <span>{t.brand.tagline}</span>
              {t.brand.name}
            </span>
          </Link>

          <nav className="nav" aria-label={t.nav.ariaMain}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className="nav__link">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <LangToggle />
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="menu-ponsel"
              onClick={() => setOpen(true)}
            >
              <span className="menu-toggle__bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Menu ponsel sengaja diletakkan DI LUAR <header>.
       * Header memakai backdrop-filter, dan elemen dengan backdrop-filter
       * menjadi acuan posisi bagi anak yang position: fixed. Kalau menu
       * berada di dalam header, panelnya hanya menutupi setinggi header. */}
      {open && (
        <div
          className="mobile-menu no-print"
          id="menu-ponsel"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          <div className="mobile-menu__top">
            <span className="mobile-menu__title">{t.nav.menu}</span>
            <LangToggle size="lg" />
            <button type="button" className="mobile-menu__close" onClick={() => setOpen(false)} autoFocus>
              <span aria-hidden="true">✕</span> {t.nav.close}
            </button>
          </div>
          <ul className="mobile-menu__list">
            {menuItems.map((item) => (
              <li key={item.to}>
                {/* onClick tetap diperlukan: kalau pemain menekan tautan
                 * halaman yang sedang dibuka, alamatnya tidak berubah,
                 * sehingga menu tidak akan tertutup dengan sendirinya. */}
                <NavLink
                  to={item.to}
                  end={item.end}
                  className="mobile-menu__link"
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu__emoji" aria-hidden="true">
                    {item.emoji}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
