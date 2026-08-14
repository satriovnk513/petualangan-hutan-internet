import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// KONFIGURASI GITHUB PAGES
// ---------------------------------------------------------------------------
// Ganti nilai di bawah dengan nama repository GitHub kamu, diapit garis miring.
// Contoh: repo https://github.com/namakamu/petualangan-hutan-internet
//         -> base = '/petualangan-hutan-internet/'
//
// Kalau kamu memakai domain sendiri atau repo <username>.github.io,
// cukup ubah menjadi: const REPO_BASE = '/'
//
// Base juga bisa di-override lewat variabel lingkungan saat build:
//   VITE_BASE=/nama-repo/ npm run build
// ---------------------------------------------------------------------------
const REPO_BASE = '/petualangan-hutan-internet/'

export default defineConfig(({ command }) => ({
  // Saat `npm run dev` selalu pakai '/', supaya mudah dibuka di localhost.
  base: command === 'serve' ? '/' : process.env.VITE_BASE || REPO_BASE,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  // `npm run preview` menolak permintaan lintas-asal secara bawaan, sehingga
  // berkas skrip <script crossorigin> ikut ditolak saat dicoba di komputer
  // sendiri. Pengaturan ini hanya memengaruhi server pratinjau lokal, bukan
  // hasil build maupun GitHub Pages.
  preview: {
    cors: true,
  },
}))
