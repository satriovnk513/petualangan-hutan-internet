import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { GameProvider } from './context/GameContext.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import './index.css'

/* HashRouter dipilih supaya alamat halaman tetap bekerja di GitHub Pages.
 * GitHub Pages tidak bisa mengarahkan semua alamat ke index.html, jadi
 * dengan HashRouter halaman seperti #/guru tetap bisa dibuka langsung
 * maupun disegarkan (refresh) tanpa muncul galat 404. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
)
