import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { heroArt } from '../utils/assets'
import { useGame } from '../context/GameContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* ===========================================================================
 * HERO BERANDA
 * ===========================================================================
 * Isinya: satu blok teks (lencana label, judul tiga baris, kalimat pendukung,
 * dua tombol, dan keterangan "Gratis") ditambah tiga ilustrasi tokoh asli
 * (Arif, Safira, Netty) di atas latar hutan yang menyesuaikan perangkat.
 *
 * LATAR HUTAN — TIGA BERKAS, TIGA GUBAHAN
 * <picture> memilih satu berkas sesuai lebar layar. Peramban hanya mengunduh
 * berkas yang terpakai, jadi ponsel tidak ikut menarik gambar desktop.
 *   >= 1024px  forest-desktop.png  1672x941   mendatar
 *   >=  768px  forest-tablet.png   1086x1448  tegak 3:4
 *   <   768px  forest-mobile.png    941x1672  tegak 9:16
 * Titik potong (object-position) diatur sendiri-sendiri di hero.css.
 *
 * PENTING — ILUSTRASI TERKUNCI
 * Keenam gambar dipakai apa adanya. Tokoh tetap tiga <img> transparan yang
 * terpisah, tidak pernah menyatu dengan latar. Jangan menambahkan filter
 * warna, mix-blend-mode, cermin, atau efek apa pun pada gambarnya. Kalau
 * teks perlu lebih terbaca, atur .hero__veil — bukan gambarnya.
 *
 * GERAKAN
 * - Tetikus (desktop): parallax halus, latar bergerak lebih sedikit
 *   daripada tokohnya. Maksimal sekitar 4-8 piksel.
 * - Sentuh (ponsel/tablet): tidak ada parallax. Hanya animasi masuk yang
 *   lembut dan Netty yang mengapung tipis.
 * - Semua gerakan mati kalau perangkat meminta "kurangi gerakan".
 * ======================================================================== */

export default function Hero() {
  const { hasProgress, nextLevelId, allComplete } = useGame()
  const reduced = useReducedMotion()
  const { lang } = useLang()
  const t = getUi(lang)
  const sceneRef = useRef(null)

  /* Parallax hanya untuk penunjuk presisi (tetikus/trackpad).
   * Perangkat sentuh sengaja dilewati supaya tidak ada gerakan tak terduga. */
  useEffect(() => {
    if (reduced) return
    const scene = sceneRef.current
    if (!scene || !window.matchMedia?.('(pointer: fine)').matches) return

    let frame = 0
    const onMove = (event) => {
      const box = scene.getBoundingClientRect()
      const x = (event.clientX - box.left) / box.width - 0.5
      const y = (event.clientY - box.top) / box.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        scene.style.setProperty('--px', x.toFixed(3))
        scene.style.setProperty('--py', y.toFixed(3))
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      scene.style.setProperty('--px', '0')
      scene.style.setProperty('--py', '0')
    }

    scene.addEventListener('pointermove', onMove)
    scene.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      scene.removeEventListener('pointermove', onMove)
      scene.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  /* Label tombol utama selalu "Lanjutkan Petualangan". Tujuannya tetap
   * mengikuti keadaan simpanan: pemain baru masuk lewat cerita pembuka,
   * pemain yang sudah punya kemajuan langsung kembali ke peta. */
  const resuming = hasProgress && !allComplete && nextLevelId
  const ctaTo = resuming ? '/main' : '/mulai'

  /* Aplikasi memakai HashRouter, jadi tautan lompat TIDAK boleh membiarkan
   * peramban mengubah alamat: "#cara-bermain" akan dibaca sebagai rute
   * /cara-bermain dan berakhir di halaman "tidak ditemukan". Polanya sama
   * dengan tautan lewati-ke-konten di App.jsx — fokus dipindahkan sendiri. */
  const jumpToHowToPlay = (event) => {
    event.preventDefault()
    const section = document.getElementById('cara-bermain')
    if (!section) return
    section.focus()
    section.scrollIntoView({ block: 'start' })
  }

  return (
    <section className={`hero ${reduced ? '' : 'hero--animate'}`} ref={sceneRef}>
      {/* --- Lapisan 1: latar hutan, satu berkas per kelompok perangkat --- */}
      <picture className="hero__picture">
        <source
          media="(min-width: 1024px)"
          srcSet={heroArt.forestDesktop.src}
          width={heroArt.forestDesktop.width}
          height={heroArt.forestDesktop.height}
        />
        <source
          media="(min-width: 768px)"
          srcSet={heroArt.forestTablet.src}
          width={heroArt.forestTablet.width}
          height={heroArt.forestTablet.height}
        />
        <img
          className="hero__forest"
          src={heroArt.forestMobile.src}
          width={heroArt.forestMobile.width}
          height={heroArt.forestMobile.height}
          alt={t.hero.altForest}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* --- Lapisan 2: gradasi setempat, hanya di belakang teks --- */}
      <span className="hero__veil" aria-hidden="true" />

      {/* --- Lapisan 3: seluruh teks dalam satu blok ---
       * Satu blok membuat urutan bacanya tetap sama di semua lebar layar:
       * lencana label, judul, kalimat pendukung, lalu tombol. */}
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span aria-hidden="true">{t.hero.eyebrowEmoji}</span> {t.hero.eyebrow}
        </p>

        {/* Patahan baris judul sengaja tetap, bukan hasil pembungkusan
         * otomatis, supaya bentuknya sama di ponsel, tablet, dan desktop. */}
        <h1 className="hero__title">
          {t.hero.titleLines.map((line) => (
            <span className="hero__title-line" key={line}>
              {line}
            </span>
          ))}
          <em className="hero__title-line">{t.hero.titleEm}</em>
        </h1>

        <p className="hero__lead">{t.hero.lead}</p>

        <div className="hero__actions">
          <Link className="hero__cta" to={ctaTo}>
            <span aria-hidden="true">{t.hero.primaryEmoji}</span> {t.hero.continue}
          </Link>
          <a
            className="hero__cta hero__cta--ghost"
            href="#cara-bermain"
            onClick={jumpToHowToPlay}
          >
            {t.hero.secondary}
          </a>
        </div>
      </div>

      {/* --- Lapisan 4: tiga tokoh, masing-masing gambar terpisah --- */}
      {/* .hero__group hanya setinggi Arif dan Safira, sehingga Netty bisa
       * ditempatkan tepat di atas kepala mereka di semua ukuran layar. */}
      <div className="hero__cast">
        <div className="hero__group">
          <img
            className="hero__arif"
            src={heroArt.arif.src}
            width={heroArt.arif.width}
            height={heroArt.arif.height}
            alt={t.hero.altArif}
            fetchPriority="high"
            decoding="async"
          />
          <img
            className="hero__safira"
            src={heroArt.safira.src}
            width={heroArt.safira.width}
            height={heroArt.safira.height}
            alt={t.hero.altSafira}
            fetchPriority="high"
            decoding="async"
          />
          <img
            className="hero__piko"
            src={heroArt.piko.src}
            width={heroArt.piko.width}
            height={heroArt.piko.height}
            alt={t.hero.altPiko}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
