/* ===========================================================================
 * PENGELOLA BAHASA / LANGUAGE MANAGER
 * ===========================================================================
 * Bahasa Indonesia adalah bahasa bawaan. Pilihan bahasa disimpan di
 * localStorage dengan kunci tersendiri, TERPISAH dari kemajuan permainan —
 * sehingga mengganti bahasa tidak pernah menyentuh skor atau level,
 * dan mengatur ulang kemajuan tidak mengubah bahasa.
 * ======================================================================== */

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const LANG_KEY = 'hutan-internet:lang'
const SUPPORTED = ['id', 'en']

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY)
      return SUPPORTED.includes(saved) ? saved : 'id'
    } catch {
      return 'id'
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_KEY, lang)
    } catch {
      /* penyimpanan diblokir — bahasa tetap berlaku selama sesi ini */
    }
    /* Penting untuk pembaca layar: atribut lang dokumen ikut berganti. */
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next)
  }, [])

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLang harus dipakai di dalam <LanguageProvider>')
  return context
}
