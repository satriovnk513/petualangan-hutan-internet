import { useEffect, useState } from 'react'
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

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
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

  // Format date if possible
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

  return (
    <div className="container container--narrow section">
      <article className="article-detail">
        {/* Back Link */}
        <Link to="/ruang-belajar" className="article-detail__back">
          <span aria-hidden="true">←</span> {t.library.backToLibrary}
        </Link>

        {/* Thumbnail Image */}
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="article-detail__hero"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
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

        {/* Body */}
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
    </div>
  )
}
