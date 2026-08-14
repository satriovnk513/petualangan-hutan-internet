/* ===========================================================================
 * PENYIMPANAN LOKAL
 * ===========================================================================
 * Semua kemajuan permainan disimpan di localStorage perangkat pemain.
 * Tidak ada data yang dikirim ke server mana pun.
 *
 * Semua fungsi dibungkus try/catch karena localStorage bisa saja diblokir
 * (mode penyamaran, pengaturan sekolah, atau kuota penuh). Kalau diblokir,
 * permainan tetap bisa dimainkan — hanya kemajuannya tidak tersimpan.
 * ======================================================================== */

export const STORAGE_KEY = 'hutan-internet:v1'

export function readState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : null
  } catch {
    return null
  }
}

export function writeState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

export function isStorageAvailable() {
  try {
    const probe = '__hutan_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}
