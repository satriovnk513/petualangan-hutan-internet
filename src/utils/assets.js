/* ===========================================================================
 * PUSAT ALAMAT GAMBAR
 * ===========================================================================
 * Semua gambar diimpor di satu tempat supaya mudah diganti nanti.
 * Untuk mengganti ilustrasi, cukup timpa berkas di src/assets/... dengan
 * nama yang sama, atau ubah baris impor di bawah ini.
 * ======================================================================== */

import arifHappy from '../assets/characters/arif_happy.png'
import arifSurprised from '../assets/characters/arif_surprised.png'
import arifScared from '../assets/characters/arif_scared.png'
import arifAngry from '../assets/characters/arif_angry.png'

import safiraHappy from '../assets/characters/safira_happy.png'
import safiraSurprised from '../assets/characters/safira_surprised.png'
import safiraScared from '../assets/characters/safira_scared.png'
import safiraAngry from '../assets/characters/safira_angry.png'

import pikoHappy from '../assets/characters/piko_happy.png'
import pikoPoint from '../assets/characters/piko_point.png'
import pikoAlert from '../assets/characters/piko_alert.png'
import pikoStern from '../assets/characters/piko_stern.png'
import pikoNo from '../assets/characters/piko_no.png'
import pikoFacepalm from '../assets/characters/piko_facepalm.png'

import duoIngat from '../assets/characters/duo_ingat.png'
import duoPhone from '../assets/characters/duo_phone.png'
import duoShy from '../assets/characters/duo_shy.png'

import hutanBg from '../assets/backgrounds/hutan_bg.jpg'

/* -------------------------------------------------------------------------
 * ILUSTRASI ASLI UNTUK HERO BERANDA — JANGAN DIUBAH
 * -------------------------------------------------------------------------
 * Keempat berkas ini disalin apa adanya dari berkas asli ilustrator
 * (ASSET PNG NETTY: 18-HUTAN.png, 1.png, 5.png, 16.png) dan dipakai
 * langsung sebagai lapisan gambar terpisah.
 *
 * Yang boleh diubah hanya UKURAN TAMPIL dan POSISI-nya lewat CSS.
 * Dilarang: menggambar ulang, mengganti warna, memberi filter warna,
 * memotong isi gambar, meregangkan (distorsi), atau menyatukannya
 * dengan teks/tombol menjadi satu gambar.
 * ---------------------------------------------------------------------- */
/* Tiga gubahan hutan yang sudah disiapkan ilustrator, satu untuk tiap
 * kelompok perangkat. Ketiganya disalin apa adanya — isi pikselnya tidak
 * pernah diubah, hanya namanya yang dibuat lebih jelas.
 *   forest-desktop.png  1672x941   (mendatar 16:9) -> mulai 1024px
 *   forest-tablet.png   1086x1448  (tegak 3:4)     -> 768px - 1023px
 *   forest-mobile.png    941x1672  (tegak 9:16)    -> sampai 767px
 * Jangan meregangkan satu berkas ke perbandingan sisi milik berkas lain. */
import heroForestDesktop from '../assets/hero/forest-desktop.png'
import heroForestTablet from '../assets/hero/forest-tablet.png'
import heroForestMobile from '../assets/hero/forest-mobile.png'
import heroArif from '../assets/hero/arif.png'
import heroSafira from '../assets/hero/safira.png'
import heroPiko from '../assets/hero/piko.png'

/* Kumpulan gambar tokoh. Kunci dipakai di seluruh aplikasi. */
export const characterArt = {
  arif_happy: arifHappy,
  arif_surprised: arifSurprised,
  arif_scared: arifScared,
  arif_angry: arifAngry,
  safira_happy: safiraHappy,
  safira_surprised: safiraSurprised,
  safira_scared: safiraScared,
  safira_angry: safiraAngry,
  piko_happy: pikoHappy,
  piko_point: pikoPoint,
  piko_alert: pikoAlert,
  piko_stern: pikoStern,
  piko_no: pikoNo,
  piko_facepalm: pikoFacepalm,
  duo_ingat: duoIngat,
  duo_phone: duoPhone,
  duo_shy: duoShy,
}

export const backgroundArt = {
  hutan: hutanBg,
}

/* Ilustrasi asli hero beranda, lengkap dengan ukuran aslinya supaya
 * peramban bisa memesan ruangnya lebih dulu (mencegah layout shift). */
export const heroArt = {
  forestDesktop: { src: heroForestDesktop, width: 1672, height: 941 },
  forestTablet: { src: heroForestTablet, width: 1086, height: 1448 },
  forestMobile: { src: heroForestMobile, width: 941, height: 1672 },
  arif: { src: heroArif, width: 800, height: 800 },
  safira: { src: heroSafira, width: 800, height: 800 },
  piko: { src: heroPiko, width: 800, height: 800 },
}

/* Keterangan gambar (alt text) tokoh sekarang ada di src/data/ui.js
 * pada bagian `alts`, supaya ikut berganti bahasa. */

/* -------------------------------------------------------------------------
 * PETA ADEGAN
 * -------------------------------------------------------------------------
 * Menghubungkan kunci `image` di src/data/levels.js dengan:
 *   art    -> latar bergambar (dibuat dengan SVG di komponen SceneArt)
 *   figure -> gambar tokoh yang muncul di adegan itu
 * Kalau nanti tersedia ilustrasi adegan penuh, tambahkan properti `photo`
 * berisi hasil impor gambar, dan komponen SceneArt akan memakainya.
 * ---------------------------------------------------------------------- */
export const sceneConfig = {
  scene_gerbang: { art: 'gate', figure: 'arif_surprised' },
  scene_kunci: { art: 'gate', figure: 'safira_surprised' },
  scene_formulir: { art: 'gate', figure: 'piko_alert' },

  scene_sungai: { art: 'river', figure: 'safira_surprised' },
  scene_judul: { art: 'river', figure: 'arif_surprised' },
  scene_dua_berita: { art: 'river', figure: 'piko_point' },

  scene_gua: { art: 'cave', figure: 'arif_scared' },
  scene_suara: { art: 'cave', figure: 'safira_scared' },
  scene_video: { art: 'cave', figure: 'piko_alert' },

  scene_jembatan: { art: 'bridge', figure: 'safira_scared' },
  scene_marah: { art: 'bridge', figure: 'arif_angry' },
  scene_izin: { art: 'bridge', figure: 'duo_phone' },

  scene_istana: { art: 'palace', figure: 'duo_shy' },
  scene_grup: { art: 'palace', figure: 'piko_stern' },
  scene_mahkota: { art: 'palace', figure: 'duo_ingat' },
}

/* Latar bergambar per level, dipakai di peta dan halaman level. */
export const levelArt = {
  1: 'gate',
  2: 'river',
  3: 'cave',
  4: 'bridge',
  5: 'palace',
}
