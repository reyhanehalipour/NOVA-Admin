import type { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import type { Theme } from './theme.types'
import { lightTheme } from './light.theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProvider theme={lightTheme}>
      {children}
    </StyledThemeProvider>
  )
}
