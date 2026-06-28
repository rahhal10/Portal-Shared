import { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import { translations } from './translations'

export const LanguageContext = createContext()

const STORAGE_KEY = 'safwa_portal_lang'

export function LanguageProvider({ children }) {
  /* Persist language to localStorage so it survives hot-reloads & navigations */
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored === 'ar' ? 'ar' : 'en'
    } catch {
      return 'en'
    }
  })

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  /** Translate a key, falling back to English then the raw key */
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.en?.[key] ?? key,
    [lang]
  )

  /* Sync dir + lang on <html>, persist to localStorage */
  useEffect(() => {
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
  }, [lang])

  const value = useMemo(
    () => ({ lang, toggle, t, isAr: lang === 'ar' }),
    [lang, toggle, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
