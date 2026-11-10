import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { LanguageContext } from './LanguageContext'
import { getDictionary } from './index'
import type { Dictionary } from './dictionary.types'
import { Language } from '../types/Enums/Language.enum'

type LanguageCode = typeof Language[keyof typeof Language]

interface LanguageProviderProps {
  children: ReactNode
}

const LANGUAGE_STORAGE_KEY = 'nova_admin_language'

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageCode>('fa')
  const dictionary: Dictionary = getDictionary(language)

  const setLanguageWithPersistence = useCallback(
    (nextLanguage: LanguageCode) => {
      setLanguage(nextLanguage)
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
        document.documentElement.lang = nextLanguage
        document.documentElement.dir = nextLanguage === 'fa' ? 'rtl' : 'ltr'
      }
    },
    []
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null
      if (stored === 'fa' || stored === 'en') {
        setLanguage(stored)
        document.documentElement.lang = stored
        document.documentElement.dir = stored === 'fa' ? 'rtl' : 'ltr'
      } else {
        document.documentElement.lang = language
        document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
      }
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, dictionary, setLanguage: setLanguageWithPersistence }}>
      {children}
    </LanguageContext.Provider>
  )
}
