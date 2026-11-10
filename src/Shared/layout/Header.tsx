import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../Dictionary/LanguageContext'
import { useTheme } from '../../Shared/theme/ThemeProvider'
import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'
import { ROUTES } from '../../Routes/appRoutes'

const routeTitleMap: Record<string, string> = {
  [ROUTES.LOGIN]: 'loginTitle',
  [ROUTES.DASHBOARD]: 'dashboard',
  [ROUTES.PRODUCTS]: 'productsTitle',
  [ROUTES.CREATE_PRODUCT]: 'createProductTitle',
  [ROUTES.USERS]: 'usersTitle',
  [ROUTES.CREATE_USER]: 'createUserTitle',
}

const HeaderContainer = styled.header<{ $theme: Theme }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: ${(props) => props.$theme.colors.background};
  border-bottom: 1px solid ${(props) => props.$theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.$theme.spacing.lg};
  z-index: 50;
`

const Title = styled.h1<{ $theme: Theme }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  margin: 0;
`

const Actions = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.sm};
`

const ThemeButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.xs};
  padding: ${(props) => props.$theme.spacing.xs} ${(props) => props.$theme.spacing.sm};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.background};
  }
`

const LanguageButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.xs};
  padding: ${(props) => props.$theme.spacing.xs} ${(props) => props.$theme.spacing.sm};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.background};
  }
`

const LogoutButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.xs};
  padding: ${(props) => props.$theme.spacing.xs} ${(props) => props.$theme.spacing.sm};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  background-color: transparent;
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.background};
  }
`

interface HeaderProps {
  theme: Theme
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { language, dictionary, setLanguage } = useLanguage()
  const { themeMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = location.pathname
  const titleKey = routeTitleMap[currentPath] || 'dashboard'
  const pageTitle = dictionary[titleKey as keyof typeof dictionary] || dictionary.dashboard

  const handleThemeToggle = () => {
    toggleTheme()
  }

  const handleLanguageChange = (nextLanguage: 'fa' | 'en') => {
    setLanguage(nextLanguage)
  }

  const handleLogout = () => {
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <HeaderContainer $theme={theme}>
      <Title $theme={theme}>{pageTitle}</Title>
      <Actions $theme={theme}>
        <ThemeButton $theme={theme} type="button" onClick={handleThemeToggle}>
          {themeMode === 'light' ? dictionary.themeDark : dictionary.themeLight}
        </ThemeButton>
        <LanguageButton
          $theme={theme}
          type="button"
          onClick={() => handleLanguageChange(language === 'fa' ? 'en' : 'fa')}
        >
          {language === 'fa' ? dictionary.languageEnglish : dictionary.languagePersian}
        </LanguageButton>
        <LogoutButton $theme={theme} type="button" onClick={handleLogout}>
          {dictionary.logout}
        </LogoutButton>
      </Actions>
    </HeaderContainer>
  )
}
