import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'
import { getLibrary, AUDIENCE_LABELS } from '../data/library'

export default function ArticleDetail() {
  const { slug } = useParams()
  const { lang } = useLang()
  const t = getUi(lang)
  const lib = getLibrary(lang)
  const audienceLabels = AUDIENCE_LABELS[lang] || AUDIENCE_LABELS.id

  const [copied, setCopied] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const touchStartXRef = useRef(null)

  const article = lib.articles?.find((a) => a.slug === slug)

  useEffect(() => {
    if (article) {
      document.title = t.titles.articleDetail
        ? t.titles.articleDetail(article.title)
        : `${article.title} — ${t.library.title}`
    } else {
      document.title = t.titles.notFound
    }
  }, [article, t])

  const galleryImages = article?.images && article.images.length > 0
    ? article.images
    : (article?.thumbnail ? [{ url: article.thumbnail, caption: article.title }] : [])

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const showPrev = useCallback(() => {
    if (galleryImages.length <= 1) return
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
  }, [galleryImages.length])

  const showNext = useCallback(() => {
    if (galleryImages.length <= 1) return
    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
  }, [galleryImages.length])

  // Keyboard navigation & lock body scroll for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  // Touch Swipe handlers for mobile lightbox
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        showNext()
      } else {
        showPrev()
      }
    }
    touchStartXRef.current = null
  }

  if (!article) {
    return (
      <div className="container container--narrow section">
        <div className="library-empty" style={{ margin: 'var(--sp-6) 0' }}>
          <div className="library-empty__icon" aria-hidden="true">
            🔍
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--sp-2)' }}>
            {t.library.emptyTitle}
          </h2>
          <p className="library-empty__text">{t.library.emptyDesc}</p>
          <div style={{ marginTop: 'var(--sp-4)' }}>
            <Link to="/ruang-belajar" className="btn btn--accent">
              ← {t.library.backToLibrary}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Other related articles (excluding current)
  const otherArticles = (lib.articles || []).filter((a) => a.slug !== slug).slice(0, 2)

  // Format date
  const formattedDate = (() => {
    try {
      const d = new Date(article.date)
      return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return article.date
    }
  })()

  const currentLightboxImg = lightboxIndex !== null ? galleryImages[lightboxIndex] : null

  return (
    <div className="container container--narrow section">
      <article className="article-detail">
        {/* Back Link */}
        <Link to="/ruang-belajar" className="article-detail__back">
          <span aria-hidden="true">←</span> {t.library.backToLibrary}
        </Link>

        {/* Hero Media: Main photo on top + 3 sub-photos aligned directly underneath */}
        {article.thumbnail && (
          <div className="article-hero-media">
            <div
              className="article-hero-media__main"
              onClick={() => openLightbox(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(0)}
              aria-label={lang === 'id' ? 'Buka foto utama di galeri' : 'Open main photo in gallery'}
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="article-detail__hero"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div className="article-hero-media__badge">
                <span>🔍</span> {lang === 'id' ? 'Galeri Foto' : 'Photo Gallery'}
              </div>
            </div>

            {/* 3 Sub-photos aligned directly underneath the main photo */}
            {galleryImages.length > 1 && (
              <div className="article-hero-media__subgrid">
                {galleryImages.slice(1).map((img, idx) => {
                  const actualIdx = idx + 1
                  return (
                    <button
                      key={actualIdx}
                      type="button"
                      className="article-hero-media__subitem"
                      onClick={() => openLightbox(actualIdx)}
                      title={img.caption || `${article.title} - Foto ${actualIdx + 1}`}
                      aria-label={`${lang === 'id' ? 'Buka foto' : 'Open photo'} ${actualIdx + 1}: ${img.caption || ''}`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption || `${article.title} ${actualIdx + 1}`}
                        className="article-hero-media__subimg"
                        loading="lazy"
                      />
                      <div className="article-hero-media__suboverlay" aria-hidden="true">
                        <span>🔍</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="article-detail__meta">
          <span className="article-detail__date">
            📅 {t.library.publishedOn} {formattedDate}
          </span>
          {article.tags?.map((tag, idx) => (
            <span key={idx} className="article-card__tag">
              {tag}
            </span>
          ))}
          {article.audience?.map((aud, idx) => (
            <span key={`aud-${idx}`} className="toolkit-card__badge toolkit-card__badge--audience">
              {audienceLabels[aud] || aud}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="article-detail__title">{article.title}</h1>

        {/* Body Content */}
        <div
          className="article-detail__body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Action bar (Share link) */}
        <div
          style={{
            marginTop: 'var(--sp-6)',
            paddingTop: 'var(--sp-4)',
            borderTop: '2px dashed var(--cream-300)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-3)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            onClick={handleCopyLink}
          >
            {copied ? '✅ ' + t.library.copiedAlert : '🔗 ' + t.library.shareStory}
          </button>

          <Link to="/ruang-belajar" className="btn btn--accent btn--sm">
            ← {t.library.backToLibrary}
          </Link>
        </div>

        {/* Related Articles */}
        {otherArticles.length > 0 && (
          <div style={{ marginTop: 'var(--sp-6)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--sp-3)', color: 'var(--forest-900)' }}>
              ✨ {lang === 'id' ? 'Cerita Lainnya' : 'More Stories'}
            </h3>
            <div className="library-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {otherArticles.map((art) => (
                <div key={art.id} className="article-card">
                  <div className="article-card__content">
                    <h4 className="article-card__title" style={{ fontSize: 'var(--text-lg)' }}>
                      {art.title}
                    </h4>
                    <p className="article-card__excerpt" style={{ fontSize: 'var(--text-xs)' }}>
                      {art.excerpt}
                    </p>
                    <Link to={`/ruang-belajar/${art.slug}`} className="article-card__action">
                      {t.library.readMore} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Lightbox Modal rendered via Portal */}
      {lightboxIndex !== null &&
        currentLightboxImg &&
        createPortal(
          <div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'id' ? 'Galeri Foto Layar Penuh' : 'Fullscreen Photo Gallery'}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox()
            }}
          >
            {/* Header: counter + close */}
            <div className="lightbox-header">
              <span className="lightbox-counter">
                📸 {lightboxIndex + 1} / {galleryImages.length}
              </span>
              <button
                type="button"
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label={lang === 'id' ? 'Tutup galeri' : 'Close gallery'}
              >
                ✕
              </button>
            </div>

            {/* Navigation buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-nav-btn--prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    showPrev()
                  }}
                  aria-label={lang === 'id' ? 'Foto sebelumnya' : 'Previous photo'}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-nav-btn--next"
                  onClick={(e) => {
                    e.stopPropagation()
                    showNext()
                  }}
                  aria-label={lang === 'id' ? 'Foto berikutnya' : 'Next photo'}
                >
                  ›
                </button>
              </>
            )}

            {/* Body */}
            <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-image-container">
                <img
                  src={currentLightboxImg.url}
                  alt={currentLightboxImg.caption || `${article.title} ${lightboxIndex + 1}`}
                  className="lightbox-image"
                />
                {currentLightboxImg.caption && (
                  <p className="lightbox-caption">{currentLightboxImg.caption}</p>
                )}
              </div>
            </div>

            {/* Thumbnails strip */}
            {galleryImages.length > 1 && (
              <div className="lightbox-thumbnails" onClick={(e) => e.stopPropagation()}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`lightbox-thumb ${idx === lightboxIndex ? 'active' : ''}`}
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`${lang === 'id' ? 'Pilih foto' : 'Select photo'} ${idx + 1}`}
                  >
                    <img src={img.url} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  )
}
