import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

/**
 * Hook to access the current language, the toggle function, and the t() translator.
 * Must be used inside a <LanguageProvider>.
 */
export function useLanguage() {
  return useContext(LanguageContext)
}
