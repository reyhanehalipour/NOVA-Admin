import { createContext, useContext, type Context } from 'react'
import type { Dictionary } from './dictionary.types'
import { Language } from '../types/Enums/Language.enum'

export type LanguageContextValue = {
  language: typeof Language[keyof typeof Language]
  dictionary: Dictionary
  setLanguage: (language: typeof Language[keyof typeof Language]) => void
}

export const LanguageContext: Context<LanguageContextValue | undefined> =
  createContext<LanguageContextValue | undefined>(undefined)

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
