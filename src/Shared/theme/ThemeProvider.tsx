import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useState, type Context } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import type { Theme } from './theme.types'
import { lightTheme } from './light.theme'
import { darkTheme } from './dark.theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  themeMode: ThemeMode
  toggleTheme: () => void
}

const THEME_STORAGE_KEY = 'nova_admin_theme'

export const ThemeContext: Context<ThemeContextValue | undefined> =
  createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const [theme, setTheme] = useState<Theme>(lightTheme)

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light'
      setTheme(next === 'light' ? lightTheme : darkTheme)
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
      if (stored === 'light' || stored === 'dark') {
        setThemeMode(stored)
        setTheme(stored === 'light' ? lightTheme : darkTheme)
      }
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
