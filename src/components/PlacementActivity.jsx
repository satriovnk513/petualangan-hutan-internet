import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* ===========================================================================
 * AKTIVITAS MELETAKKAN KARTU
 * ===========================================================================
 * Satu komponen untuk dua bentuk scene:
 *
 *   variant="match" — memasangkan. Setiap kotak adalah awal kalimat dan hanya
 *                     menampung SATU kartu tindakan.
 *   variant="sort"  — kartu kategori. Setiap kotak boleh menampung beberapa
 *                     kartu sekaligus.
 *
 * CARA ANAK MENJAWAB
 * -------------------------------------------------------------------------
 * 1. KETUK–KETUK (cara utama, terutama di ponsel dan tablet)
 *    Ketuk kartunya, lalu ketuk tempat yang cocok. Kartu langsung pindah.
 *    Untuk memindahkan lagi: ketuk kartu yang sudah diletakkan, lalu ketuk
 *    tempat lain. Cara ini juga berfungsi dengan papan ketik, karena kartu
 *    maupun tempat tujuannya sama-sama <button>.
 *
 * 2. MENYERET (tambahan, bukan syarat)
 *    Tetikus: seret begitu bergerak lebih dari DRAG_THRESHOLD piksel.
 *    Layar sentuh: harus DITAHAN dulu (TOUCH_HOLD_MS) baru kartunya ikut jari.
 *    Selama belum ditahan, jari dipakai untuk menggulung halaman seperti
 *    biasa. Permainan TIDAK PERNAH mengharuskan anak menyeret: semua scene
 *    bisa diselesaikan sepenuhnya dengan ketuk–ketuk.
 *
 * SUPAYA HALAMAN TETAP BISA DIGULUNG
 * -------------------------------------------------------------------------
 * Kartu memakai `touch-action: manipulation`, jadi gulir bawaan peramban
 * tidak pernah dimatikan. Gulir baru ditahan (lewat listener 'touchmove'
 * non-pasif) SESUDAH seretan benar-benar aktif, dan hanya pada kartu yang
 * sedang diseret. Kalau jari bergerak sebelum tahanan selesai, niat menyeret
 * dibatalkan dan halaman menggulung seperti biasa.
 *
 * PENILAIAN
 * -------------------------------------------------------------------------
 * Yang dihitung hanya saat anak menekan tombol periksa: 10 poin kalau semua
 * tepat pada penekanan pertama, 0 kalau belum. Memindah-mindahkan kartu
 * sebelum menekan tombol tidak dihitung sebagai percobaan. Sesudah itu anak
 * tetap boleh memperbaiki sampai tepat supaya permainan bisa dilanjutkan.
 *
 * BAHASA
 * -------------------------------------------------------------------------
 * Semua keadaan disimpan sebagai id (id kartu & id kotak), bukan teks, jadi
 * berganti bahasa di tengah scene tidak menghapus jawaban, tidak mengacak
 * ulang kartu, dan tidak menambah hitungan percobaan.
 * ======================================================================== */

const TRAY = '__tray__'
/* Jarak gerak tetikus sebelum dianggap menyeret. */
const DRAG_THRESHOLD = 8
/* Lama menahan jari sebelum kartu ikut bergerak di layar sentuh. */
const TOUCH_HOLD_MS = 220
/* Gerakan jari sebesar ini selama masa tahan = anak ingin menggulung. */
const TOUCH_CANCEL_SLOP = 12

export default function PlacementActivity({
  variant = 'sort',
  prompt,
  cards,
  targets,
  solution,
  onFirstCheck,
  onSolved,
  onRetry,
}) {
  const { lang } = useLang()
  const t = getUi(lang)
  const a = t.activity

  const singleSlot = variant === 'match'

  /* { [idKartu]: idKotak | null } */
  const [placements, setPlacements] = useState(() =>
    Object.fromEntries(cards.map((card) => [card.id, null])),
  )
  const [selected, setSelected] = useState(null)
  /* { [idKartu]: 'ok' | 'check' } — hasil pemeriksaan terakhir */
  const [marks, setMarks] = useState({})
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)
  const [message, setMessage] = useState('')

  const [drag, setDrag] = useState(null)
  const [hover, setHover] = useState(null)

  const dragRef = useRef(null)
  const skipClickRef = useRef(false)
  const targetRefs = useRef({})
  const trayRef = useRef(null)

  const isLocked = useCallback((cardId) => solved || marks[cardId] === 'ok', [solved, marks])

  const labelOf = useCallback(
    (cardId) => cards.find((card) => card.id === cardId)?.label ?? '',
    [cards],
  )
  const targetLabelOf = useCallback(
    (targetId) => targets.find((target) => target.id === targetId)?.label ?? '',
    [targets],
  )

  const cardsIn = useCallback(
    (targetId) => cards.filter((card) => placements[card.id] === targetId),
    [cards, placements],
  )

  const trayCards = useMemo(
    () => cards.filter((card) => !placements[card.id]),
    [cards, placements],
  )

  const allPlaced = useMemo(() => cards.every((card) => placements[card.id]), [cards, placements])

  /* ------------------------------------------------------------------ */
  /* Memindahkan kartu                                                   */
  /* ------------------------------------------------------------------ */

  const place = useCallback(
    (cardId, targetId) => {
      if (isLocked(cardId)) return
      const destination = targetId === TRAY ? null : targetId

      if (placements[cardId] === destination) {
        setSelected(null)
        return
      }

      const next = { ...placements, [cardId]: destination }

      /* Pada bentuk memasangkan, satu kotak hanya untuk satu kartu.
       * Kartu yang tadi ada di sana bertukar tempat, bukan hilang. */
      if (singleSlot && destination) {
        const occupant = cards.find(
          (card) => card.id !== cardId && placements[card.id] === destination,
        )
        if (occupant) {
          if (isLocked(occupant.id)) {
            setSelected(null)
            setMessage(a.slotTaken)
            return
          }
          next[occupant.id] = placements[cardId] ?? null
        }
      }

      setPlacements(next)

      /* Tanda "periksa lagi" ikut hilang begitu kartunya dipindahkan. */
      setMarks((current) => {
        if (!current[cardId]) return current
        const cleaned = { ...current }
        delete cleaned[cardId]
        return cleaned
      })

      setSelected(null)
      setMessage(
        destination
          ? a.srPlaced(labelOf(cardId), targetLabelOf(destination))
          : a.srReturned(labelOf(cardId)),
      )
    },
    [a, cards, isLocked, labelOf, placements, singleSlot, targetLabelOf],
  )

  const activateCard = useCallback(
    (cardId) => {
      if (isLocked(cardId)) return
      setSelected((current) => {
        const next = current === cardId ? null : cardId
        setMessage(next ? a.srSelected(labelOf(cardId)) : '')
        return next
      })
    },
    [a, isLocked, labelOf],
  )

  const activateTarget = useCallback(
    (targetId) => {
      if (solved) return
      if (!selected) {
        setMessage(a.pickCardFirst)
        return
      }
      place(selected, targetId)
    },
    [a, place, selected, solved],
  )

  /* ------------------------------------------------------------------ */
  /* Menyeret kartu                                                      */
  /* ------------------------------------------------------------------ */

  const hitTest = useCallback(
    (x, y) => {
      for (const target of targets) {
        const element = targetRefs.current[target.id]
        if (!element) continue
        const box = element.getBoundingClientRect()
        if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) return target.id
      }
      const tray = trayRef.current
      if (tray) {
        const box = tray.getBoundingClientRect()
        if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) return TRAY
      }
      return null
    },
    [targets],
  )

  /* Menahan gulir HANYA selama sebuah kartu benar-benar sedang diseret.
   * Listener-nya non-pasif supaya preventDefault-nya diterima peramban. */
  const blockScroll = useRef((event) => event.preventDefault())

  const stopDragging = useCallback(() => {
    const state = dragRef.current
    if (state) {
      if (state.holdTimer) clearTimeout(state.holdTimer)
      if (state.element) {
        state.element.removeEventListener('touchmove', blockScroll.current)
        if (state.captured) {
          try {
            state.element.releasePointerCapture(state.pointerId)
          } catch {
            /* penunjuk sudah dilepas peramban — tidak apa-apa */
          }
        }
      }
    }
    dragRef.current = null
    setDrag(null)
    setHover(null)
  }, [])

  /* Kalau komponen dilepas saat jari masih menempel, bersihkan listener. */
  useEffect(() => stopDragging, [stopDragging])

  const armDrag = useCallback((state) => {
    state.armed = true
    state.holdTimer = null
    if (state.element) {
      /* Sesudah ditahan, peramban belum mulai menggulung, sehingga
       * preventDefault di sini masih diterima. */
      state.element.addEventListener('touchmove', blockScroll.current, { passive: false })
      try {
        state.element.setPointerCapture(state.pointerId)
        state.captured = true
      } catch {
        /* Perangkat lama tanpa pointer capture tetap bisa memakai ketuk. */
      }
    }
    setDrag({ cardId: state.cardId, dx: 0, dy: 0 })
  }, [])

  const handlePointerDown = (event, cardId) => {
    if (isLocked(cardId) || event.button > 0) return
    /* Kalau ada sisa seretan yang belum sempat ditutup peramban (misalnya
     * jendela kehilangan fokus di tengah jalan), bereskan dulu supaya tidak
     * ada kartu yang tersangkut dalam keadaan "sedang diseret". */
    if (dragRef.current) stopDragging()
    /* Dibersihkan di awal setiap sentuhan baru. Kalau seretan sebelumnya
     * berakhir di kotak lain, peramban tidak selalu mengirim klik penutup,
     * dan tanda yang tertinggal akan menelan ketukan berikutnya. */
    skipClickRef.current = false

    const isTouch = event.pointerType === 'touch'
    const state = {
      cardId,
      pointerId: event.pointerId,
      element: event.currentTarget,
      startX: event.clientX,
      startY: event.clientY,
      isTouch,
      moved: false,
      captured: false,
      /* Tetikus dan pena langsung siap menyeret; jari harus menahan dulu
       * supaya gerakan untuk menggulung tidak salah dibaca. */
      armed: !isTouch,
      holdTimer: null,
    }
    dragRef.current = state

    if (!isTouch) {
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
        state.captured = true
      } catch {
        /* tidak apa-apa, ketuk–ketuk tetap jalan */
      }
      return
    }

    state.holdTimer = setTimeout(() => {
      if (dragRef.current === state) armDrag(state)
    }, TOUCH_HOLD_MS)
  }

  const handlePointerMove = (event) => {
    const state = dragRef.current
    if (!state || state.pointerId !== event.pointerId) return

    const dx = event.clientX - state.startX
    const dy = event.clientY - state.startY
    const distance = Math.hypot(dx, dy)

    /* Jari bergerak sebelum tahanan selesai: anak ingin menggulung halaman,
     * bukan menyeret kartu. Niat menyeret dibatalkan diam-diam. */
    if (!state.armed) {
      if (distance > TOUCH_CANCEL_SLOP) stopDragging()
      return
    }

    if (!state.moved && !state.isTouch && distance < DRAG_THRESHOLD) return

    state.moved = true
    setDrag({ cardId: state.cardId, dx, dy })
    setHover(hitTest(event.clientX, event.clientY))
  }

  const finishPointer = (event) => {
    const state = dragRef.current
    if (!state || state.pointerId !== event.pointerId) return
    const { moved, cardId } = state
    stopDragging()
    if (!moved) return
    /* Sesudah menyeret, klik penutup dari peramban tidak boleh ikut
     * mengubah pilihan kartu. */
    skipClickRef.current = true
    const dropped = hitTest(event.clientX, event.clientY)
    if (dropped) place(cardId, dropped)
  }

  const handleCardClick = (event, cardId) => {
    event.stopPropagation()
    if (skipClickRef.current) {
      skipClickRef.current = false
      return
    }
    activateCard(cardId)
  }

  /* ------------------------------------------------------------------ */
  /* Memeriksa jawaban                                                   */
  /* ------------------------------------------------------------------ */

  const check = () => {
    if (!allPlaced || solved) return
    const wrong = cards.filter((card) => placements[card.id] !== solution[card.id])
    const nextMarks = {}
    cards.forEach((card) => {
      nextMarks[card.id] = placements[card.id] === solution[card.id] ? 'ok' : 'check'
    })
    setMarks(nextMarks)
    setSelected(null)

    const firstTry = attempts === 0
    const allCorrect = wrong.length === 0
    setAttempts((current) => current + 1)
    if (firstTry) onFirstCheck?.(allCorrect)

    if (allCorrect) {
      setSolved(true)
      setMessage(firstTry ? a.doneFirstTry : a.doneAfterFix)
      onSolved?.(firstTry)
    } else {
      setMessage(singleSlot ? a.retryPairs(wrong.length) : a.retryCards(wrong.length))
      onRetry?.()
    }
  }

  /* ------------------------------------------------------------------ */
  /* Tampilan                                                            */
  /* ------------------------------------------------------------------ */

  /* Keadaan kartu selalu ditandai tiga hal sekaligus: warna, ikon, dan teks.
   * Anak yang sulit membedakan warna tetap bisa membacanya. */
  const cardState = (card) => {
    const mark = marks[card.id]
    if (mark === 'ok') return { key: 'ok', icon: '✓', text: a.markOk }
    if (mark === 'check') return { key: 'check', icon: '!', text: a.markCheck }
    if (selected === card.id) return { key: 'selected', icon: '✓', text: a.selected }
    return { key: 'idle', icon: '⠿', text: '' }
  }

  const renderCard = (card) => {
    const locked = isLocked(card.id)
    const state = cardState(card)
    const isSelected = selected === card.id
    const isDragging = drag?.cardId === card.id
    const where = placements[card.id]

    const classes = ['place-card', `place-card--${state.key}`]
    if (isDragging) classes.push('place-card--dragging')

    /* Kalimat lengkap untuk pembaca layar: isi kartu, keadaannya, dan
     * di mana kartu itu berada sekarang. */
    const parts = [card.label]
    if (state.text) parts.push(state.text)
    parts.push(where ? a.srInBox(targetLabelOf(where)) : a.srInTray)

    return (
      <li key={card.id}>
        <button
          type="button"
          className={classes.join(' ')}
          style={
            isDragging
              ? { transform: `translate(${drag.dx}px, ${drag.dy}px) rotate(-1.5deg)` }
              : undefined
          }
          onPointerDown={(event) => handlePointerDown(event, card.id)}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={stopDragging}
          /* Peramban mencabut penunjuk (jendela kehilangan fokus, jari
           * terangkat di luar layar): kartu jangan sampai tersangkut. */
          onLostPointerCapture={stopDragging}
          onClick={(event) => handleCardClick(event, card.id)}
          disabled={locked}
          aria-pressed={isSelected}
          aria-label={parts.join('. ')}
        >
          <span className="place-card__grip" aria-hidden="true">
            {state.icon}
          </span>
          <span className="place-card__label">{card.label}</span>
          {state.text && (
            <span className="place-card__state" aria-hidden="true">
              {state.text}
            </span>
          )}
        </button>
      </li>
    )
  }

  const waiting = !!selected && !solved

  return (
    <div className={`place place--${variant}`}>
      <p className="place__prompt">{prompt}</p>
      <p className="place__hint">
        <span aria-hidden="true">👆</span> {a.hint}
      </p>

      <div
        className={`place__tray${hover === TRAY ? ' place__tray--over' : ''}`}
        ref={trayRef}
        onClick={() => activateTarget(TRAY)}
      >
        <div className="place__tray-head">
          <button
            type="button"
            className="place__tray-btn"
            onClick={(event) => {
              event.stopPropagation()
              activateTarget(TRAY)
            }}
          >
            <span className="place__tray-icon" aria-hidden="true">
              🗂️
            </span>
            {a.trayLabel}
          </button>
        </div>
        {trayCards.length > 0 ? (
          <ul className="place__cards">{trayCards.map(renderCard)}</ul>
        ) : (
          <p className="place__empty">{a.trayEmpty}</p>
        )}
      </div>

      <ul className={`place__targets place__targets--${variant}`}>
        {targets.map((target) => {
          const inside = cardsIn(target.id)
          const isOver = hover === target.id
          return (
            <li key={target.id}>
              <div
                className={`place__target${isOver ? ' place__target--over' : ''}${
                  waiting ? ' place__target--ready' : ''
                }`}
                ref={(element) => {
                  targetRefs.current[target.id] = element
                }}
                onClick={() => activateTarget(target.id)}
              >
                <button
                  type="button"
                  className="place__target-head"
                  onClick={(event) => {
                    event.stopPropagation()
                    activateTarget(target.id)
                  }}
                  aria-label={waiting ? a.srPutHere(target.label, labelOf(selected)) : target.label}
                >
                  {target.icon && (
                    <span className="place__target-icon" aria-hidden="true">
                      {target.icon}
                    </span>
                  )}
                  <span className="place__target-label">{target.label}</span>
                  {waiting && (
                    <span className="place__target-cue" aria-hidden="true">
                      {a.putHere}
                    </span>
                  )}
                </button>
                {inside.length > 0 ? (
                  <ul className="place__cards place__cards--in">{inside.map(renderCard)}</ul>
                ) : (
                  <p className="place__slot-empty">{singleSlot ? a.slotEmptyPair : a.slotEmpty}</p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <p className="place__status" aria-live="polite">
        {message}
      </p>

      {!solved && (
        <div className="btn-row">
          <button
            type="button"
            className="btn btn--accent btn--lg btn--block"
            onClick={check}
            disabled={!allPlaced}
          >
            {attempts === 0 ? a.check : a.checkAgain}
          </button>
        </div>
      )}

      {!allPlaced && !solved && <p className="place__note">{a.placeAllFirst}</p>}
    </div>
  )
}
