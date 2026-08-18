import { useEffect } from 'react'

/**
 * Custom Hook for Dynamic SEO Management
 * Updates page title, meta descriptions, Open Graph, Twitter cards, and JSON-LD structured data.
 *
 * @param {Object} options
 * @param {string} options.title - Page title
 * @param {string} [options.description] - Meta description
 * @param {string|string[]} [options.keywords] - Meta keywords
 * @param {string} [options.ogImage] - Open Graph image URL
 * @param {string} [options.ogType] - Open Graph type ('website' | 'article')
 * @param {string} [options.canonical] - Canonical URL
 * @param {string} [options.lang] - Language code ('id' | 'en')
 * @param {Object} [options.schema] - JSON-LD Schema.org object
 */
export function useSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonical,
  lang,
  schema,
} = {}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title
    }

    // 2. Helper to set or create meta tag
    const setMeta = (attr, key, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 3. Update Meta Description
    if (description) {
      setMeta('name', 'description', description)
      setMeta('name', 'title', title || document.title)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    // 4. Update Meta Title for Social
    if (title) {
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }

    // 5. Update Keywords
    if (keywords) {
      const kwString = Array.isArray(keywords) ? keywords.join(', ') : keywords
      setMeta('name', 'keywords', kwString)
    }

    // 6. Update OG Image
    if (ogImage) {
      const fullImg = ogImage.startsWith('http')
        ? ogImage
        : `https://petualangan-hutan-internet.netlify.app${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
      setMeta('property', 'og:image', fullImg)
      setMeta('name', 'twitter:image', fullImg)
    }

    // 7. Update OG Type
    if (ogType) {
      setMeta('property', 'og:type', ogType)
    }

    // 8. Update OG URL / Canonical
    const currentUrl = canonical || window.location.href
    setMeta('property', 'og:url', currentUrl)
    setMeta('name', 'twitter:url', currentUrl)

    let canonicalEl = document.querySelector('link[rel="canonical"]')
    if (canonicalEl && canonical) {
      canonicalEl.setAttribute('href', canonical)
    }

    // 9. Update HTML lang attribute
    if (lang) {
      document.documentElement.setAttribute('lang', lang)
    }

    // 10. Update Dynamic Structured Data (JSON-LD)
    const scriptId = 'dynamic-seo-schema'
    let schemaScript = document.getElementById(scriptId)

    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script')
        schemaScript.id = scriptId
        schemaScript.type = 'application/ld+json'
        document.head.appendChild(schemaScript)
      }
      schemaScript.textContent = JSON.stringify(schema)
    } else if (schemaScript) {
      schemaScript.remove()
    }

    return () => {
      // Optional cleanup on unmount
    }
  }, [title, description, keywords, ogImage, ogType, canonical, lang, schema])
}
