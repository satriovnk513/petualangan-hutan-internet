import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useGame } from '../context/GameContext'
import { useLang } from '../i18n/LanguageContext'
import { getUi } from '../data/ui'

/* Menghapus seluruh kemajuan di perangkat.
 * Selalu memunculkan konfirmasi lebih dulu supaya tidak terhapus tak sengaja.
 * Pilihan bahasa TIDAK ikut terhapus — kuncinya terpisah. */
export default function ResetProgressButton({ className = 'btn btn--danger', label }) {
  const [open, setOpen] = useState(false)
  const { resetAll, hasProgress } = useGame()
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = getUi(lang)

  const confirm = () => {
    resetAll()
    setOpen(false)
    navigate('/')
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <span aria-hidden="true">♻️</span> {label ?? t.reset.button}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={t.reset.title} labelledBy="reset-title">
        <p>{hasProgress ? t.reset.bodyHasProgress : t.reset.bodyNoProgress}</p>
        <p>
          <strong>{t.reset.warning}</strong>
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn--ghost" onClick={() => setOpen(false)}>
            {t.reset.cancel}
          </button>
          <button type="button" className="btn btn--danger" onClick={confirm}>
            {t.reset.confirm}
          </button>
        </div>
      </Modal>
    </>
  )
}
