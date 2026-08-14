# Ikon harta karun

Kelima harta karun saat ini memakai simbol emoji (🗝️ 🧭 🔍 🛡️ 👑) yang
ditentukan di `src/data/levels.js` (properti `treasureSymbol`).

Untuk mengganti dengan ilustrasi asli, simpan berkas di folder ini:

- `kunci-kehati-hatian.png`   (Key of Caution)
- `kompas-kebenaran.png`      (Compass of Truth)
- `lensa-ketelitian.png`      (Lens of Clarity)
- `perisai-kebaikan.png`      (Shield of Kindness)
- `mahkota-kebijaksanaan.png` (Crown of Wisdom)

Lalu impor di `src/utils/assets.js` dan pakai di
`src/components/TreasureCard.jsx`.
Ukuran yang disarankan: 512 x 512 piksel, PNG dengan latar transparan.
