import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'
import { getLibrary, AUDIENCE_LABELS } from '../data/library'
import { useSEO } from '../hooks/useSEO'

export default function Library() {
  const { lang } = useLang()
  const t = getUi(lang)
  const lib = getLibrary(lang)
  const audienceLabels = AUDIENCE_LABELS[lang] || AUDIENCE_LABELS.id

  const [activeTab, setActiveTab] = useState('all')

  useSEO({
    title: t.titles.library,
    description: lang === 'en'
      ? 'Browse digital literacy articles, guides, classroom toolkits, and slide presentations for children, educators, and parents.'
      : 'Pusat bacaan artikel edukasi, panduan guru, panduan orang tua, dan toolkit materi presentasi literasi media & digital anak.',
    keywords: [
      'ruang belajar literasi digital',
      'artikel edukasi anak sd',
      'toolkit guru literasi digital',
      'materi presentasi literasi digital pdf',
      'kegiatan literasi digital sekolah dasar',
    ],
    ogImage: '/images/library/seminar-literasi.jpg',
    lang,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': t.library.title,
      'description': t.library.intro,
      'url': 'https://petualangan-hutan-internet.netlify.app/#/ruang-belajar',
    },
  })

  const articles = lib.articles || []
  const toolkits = lib.toolkits || []

  const showArticles = activeTab === 'all' || activeTab === 'articles'
  const showToolkits = activeTab === 'all' || activeTab === 'toolkits'

  return (
    <div className="container section">
      {/* Page Header */}
      <div className="page-head" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--sp-5)' }}>
        <span className="page-head__eyebrow">
          <span aria-hidden="true">{t.library.eyebrowEmoji}</span> {t.library.eyebrow}
        </span>
        <h1>{t.library.title}</h1>
        <p>{t.library.intro}</p>
      </div>

      {/* Filter Tabs */}
      <div className="library-filters" role="tablist" aria-label={t.library.title}>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          ✨ {t.library.categoryAll}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'articles'}
          className={`filter-tab ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          📰 {t.library.categoryArticles}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'toolkits'}
          className={`filter-tab ${activeTab === 'toolkits' ? 'active' : ''}`}
          onClick={() => setActiveTab('toolkits')}
        >
          🧰 {t.library.categoryToolkits}
        </button>
      </div>

      {/* Articles Section */}
      {showArticles && (
        <section className="section--tight" aria-labelledby="articles-heading">
          {activeTab === 'all' && (
            <div className="library-header">
              <h2 id="articles-heading">📰 {t.library.categoryArticles}</h2>
            </div>
          )}
          {articles.length > 0 ? (
            <div className="library-grid">
              {articles.map((art) => (
                <article key={art.id} className="article-card">
                  <img
                    src={art.thumbnail}
                    alt={art.title}
                    className="article-card__thumbnail"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="article-card__content">
                    <div className="article-card__tags">
                      {art.tags?.map((tag, idx) => (
                        <span key={idx} className="article-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="article-card__title">{art.title}</h3>
                    <p className="article-card__excerpt">{art.excerpt}</p>
                    <Link
                      to={`/ruang-belajar/${art.slug}`}
                      className="article-card__action"
                      aria-label={`${t.library.readMore}: ${art.title}`}
                    >
                      {t.library.readMore} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="library-empty">
              <div className="library-empty__icon" aria-hidden="true">
                📭
              </div>
              <p className="library-empty__text">{t.library.emptyDesc}</p>
            </div>
          )}
        </section>
      )}

      {/* Toolkits Section */}
      {showToolkits && (
        <section className="section--tight" aria-labelledby="toolkits-heading">
          {activeTab === 'all' && (
            <div className="library-header" style={{ marginTop: 'var(--sp-6)' }}>
              <h2 id="toolkits-heading">🧰 {t.library.categoryToolkits}</h2>
            </div>
          )}
          {toolkits.length > 0 ? (
            <div className="library-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {toolkits.map((tk) => (
                <div key={tk.id} className="toolkit-card">
                  <div className="toolkit-card__icon" aria-hidden="true">
                    {tk.icon || '📦'}
                  </div>
                  <div className="toolkit-card__info">
                    <div className="toolkit-card__badges">
                      <span className="toolkit-card__badge toolkit-card__badge--type">
                        {tk.type}
                      </span>
                      {tk.audience && audienceLabels[tk.audience] && (
                        <span className="toolkit-card__badge toolkit-card__badge--audience">
                          {audienceLabels[tk.audience]}
                        </span>
                      )}
                    </div>
                    <h3 className="toolkit-card__title">{tk.title}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', margin: 'var(--sp-1) 0 var(--sp-2)' }}>
                      {tk.description}
                    </p>
                    <div className="toolkit-card__action">
                      {tk.link ? (
                        <Link to={tk.link} className="btn btn--accent btn--sm">
                          {tk.actionText || t.library.viewResource} →
                        </Link>
                      ) : tk.fileUrl ? (
                        <a
                          href={tk.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--accent btn--sm"
                        >
                          {tk.actionText || t.library.viewResource} 📥
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm disabled"
                          disabled
                          title={t.library.comingSoon}
                        >
                          ⏳ {t.library.comingSoon}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="library-empty">
              <div className="library-empty__icon" aria-hidden="true">
                📭
              </div>
              <p className="library-empty__text">{t.library.emptyDesc}</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
