import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/* Kotak dialog sederhana dengan jebakan fokus, tombol Esc,
 * dan klik di luar untuk menutup. */
export default function Modal({ open, onClose, title, children, labelledBy = 'modal-title' }) {
  const panelRef = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (!open) return

    previousFocus.current = document.activeElement
    const panel = panelRef.current
    const focusables = panel?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusables?.[0]?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="modal-backdrop no-print"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={labelledBy} ref={panelRef}>
        <h2 id={labelledBy}>{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  )
}

