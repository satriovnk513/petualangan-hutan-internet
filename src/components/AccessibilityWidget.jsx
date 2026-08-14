import { useEffect } from 'react'

/**
 * Sienna Accessibility Widget Integration
 * Integrates the open-source lightweight accessibility toolbar across the application.
 * Positioned on bottom-left to avoid colliding with Tanya Piko AI chatbot on bottom-right.
 */
export default function AccessibilityWidget() {
  useEffect(() => {
    if (document.getElementById('sienna-accessibility-script')) return

    const script = document.createElement('script')
    script.id = 'sienna-accessibility-script'
    script.src = 'https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna.min.js'
    script.defer = true
    script.setAttribute('data-primary-color', '#1c6b4a')
    script.setAttribute('data-position', 'bottom-left')
    script.setAttribute('data-button-icon', 'accessibility')

    document.body.appendChild(script)

    return () => {
      const existing = document.getElementById('sienna-accessibility-script')
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing)
      }
    }
  }, [])

  return null
}
