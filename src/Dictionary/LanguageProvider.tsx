import { useState, type ReactNode } from 'react'
import { LanguageContext } from './LanguageContext'
import { getDictionary } from './index'
import type { Dictionary } from './dictionary.types'
import { Language } from '../types/Enums/Language.enum'

type LanguageCode = typeof Language[keyof typeof Language]

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageCode>('fa')
  const dictionary: Dictionary = getDictionary(language)

  return (
    <LanguageContext.Provider value={{ language, dictionary, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
