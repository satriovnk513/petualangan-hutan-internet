import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatbotRoot from './components/chatbot/ChatbotRoot'
import Home from './pages/Home'
import Intro from './pages/Intro'
import CharacterSelect from './pages/CharacterSelect'
import MapPage from './pages/MapPage'
import Level from './pages/Level'
import Results from './pages/Results'
import CertificatePage from './pages/CertificatePage'
import Teachers from './pages/Teachers'
import Parents from './pages/Parents'
import About from './pages/About'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import { useScrollToTop } from './hooks/useScrollToTop'
import { useLang } from './i18n/LanguageContext'
import { getUi } from './data/ui'

export default function App() {
  useScrollToTop()
  const { lang } = useLang()
  const t = getUi(lang)
  /* Catatan: tinggi header TIDAK diukur lewat JavaScript.
   * Nilainya sudah pasti di CSS (--header-h di src/styles/layout.css),
   * karena tinggi bilah header ditentukan min-height dan judul mereknya
   * dibatasi dua baris. Menyetelnya lewat JS justru berbahaya: gaya inline
   * pada <html> mengalahkan aturan breakpoint di CSS, sehingga nilai lama
   * ikut terbawa saat lebar layar berubah. */

  /* Aplikasi memakai HashRouter, jadi tautan lompat tidak boleh mengubah
   * alamat halaman. Fokus dipindahkan langsung ke isi halaman. */
  const skipToContent = (event) => {
    event.preventDefault()
    const main = document.getElementById('konten')
    if (!main) return
    main.focus()
    main.scrollIntoView({ block: 'start' })
  }

  return (
    <div className="app">
      <a className="skip-link" href="#konten" onClick={skipToContent}>
        {t.skipLink}
      </a>

      <Header />

      <main className="main" id="konten" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mulai" element={<Intro />} />
          <Route path="/pilih-tokoh" element={<CharacterSelect />} />
          <Route path="/main" element={<MapPage />} />
          <Route path="/main/:levelId" element={<Level />} />
          <Route path="/hasil" element={<Results />} />
          <Route path="/sertifikat" element={<CertificatePage />} />
          <Route path="/guru" element={<Teachers />} />
          <Route path="/orang-tua" element={<Parents />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/privasi" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Chatbot pendamping belajar — tersedia di semua halaman */}
      <ChatbotRoot />
    </div>
  )
}

