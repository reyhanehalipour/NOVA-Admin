import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../Dictionary/LanguageContext'
import { LayoutDashboard, Package, Settings, Sun, Moon, Users, Languages, User, ShoppingBag } from 'lucide-react'
import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'
import { ROUTES } from '../../Routes/appRoutes'
import { useTheme } from '../theme/ThemeProvider'

const SidebarContainer = styled.aside<{ $theme: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: ${(props) => props.$theme.colors.sidebarBackground};
  border-right: 1px solid ${(props) => props.$theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  z-index: 100;
`

const LogoBox = styled.div<{ $theme: Theme }>`
  padding: ${(props) => props.$theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.$theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.sm};
`

const LogoText = styled.span<{ $theme: Theme }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.$theme.colors.sidebarText};
`

const LogoIcon = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    stroke: ${(props) => props.$theme.colors.accent};
  }
`

const Menu = styled.nav<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.$theme.spacing.md};
  gap: ${(props) => props.$theme.spacing.xs};
  flex: 1;
`

const MenuItem = styled(NavLink)<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.sm};
  padding: ${(props) => props.$theme.spacing.sm} ${(props) => props.$theme.spacing.md};
  color: ${(props) => props.$theme.colors.sidebarText};
  text-decoration: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.sidebarHover};
  }

  &.active {
    background-color: ${(props) => props.$theme.colors.activeBlue};
    color: ${(props) => props.$theme.colors.sidebarText};

    svg {
      stroke: ${(props) => props.$theme.colors.sidebarText};
    }
  }
`

const ControlsGroup = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$theme.spacing.xs};
  padding: ${(props) => props.$theme.spacing.md};
  border-top: 1px solid ${(props) => props.$theme.colors.sidebarBorder};
  margin-top: auto;
`

const ControlButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.$theme.spacing.xs};
  padding: ${(props) => props.$theme.spacing.sm} ${(props) => props.$theme.spacing.md};
  color: ${(props) => props.$theme.colors.sidebarText};
  background-color: transparent;
  border: 1px solid ${(props) => props.$theme.colors.sidebarBorder};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.sidebarHover};
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: ${(props) => props.$theme.colors.sidebarText};
  }
`

const ProfileSection = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.sm};
  padding: ${(props) => props.$theme.spacing.md};
  border-top: 1px solid ${(props) => props.$theme.colors.sidebarBorder};
`

const ProfileAvatar = styled.div<{ $theme: Theme }>`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.$theme.colors.primary};
  border-radius: ${(props) => props.$theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.$theme.colors.onPrimary};
  font-size: 0.875rem;
  font-weight: 600;
`

const ProfileInfo = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
`

const ProfileName = styled.div<{ $theme: Theme }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.sidebarText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProfileRole = styled.div<{ $theme: Theme }>`
  font-size: 0.75rem;
  color: ${(props) => props.$theme.colors.sidebarMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface MenuItemConfig {
  path: string
  key: string
  icon: React.ComponentType<{ className?: string }>
}

export const Sidebar: React.FC<{ theme: Theme }> = ({ theme }) => {
  const { language, dictionary, setLanguage } = useLanguage()
  const { themeMode, toggleTheme } = useTheme()

  const menuItems: MenuItemConfig[] = [
    { path: ROUTES.DASHBOARD, key: 'dashboard', icon: LayoutDashboard },
    { path: ROUTES.PRODUCTS, key: 'productsTitle', icon: Package },
    { path: ROUTES.USERS, key: 'usersTitle', icon: Users },
    { path: '/settings', key: 'settings', icon: Settings },
  ]

  return (
    <SidebarContainer $theme={theme}>
      <LogoBox $theme={theme}>
        <LogoIcon $theme={theme}>
          <ShoppingBag size={24} strokeWidth={2} />
        </LogoIcon>
        <LogoText $theme={theme}>NOVA</LogoText>
      </LogoBox>
      <Menu $theme={theme}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            $theme={theme}
          >
            <item.icon className="sidebar-icon" />
            {dictionary[item.key as keyof typeof dictionary]}
          </MenuItem>
        ))}
      </Menu>
      <ControlsGroup $theme={theme}>
        <ControlButton $theme={theme} type="button" onClick={toggleTheme} aria-label={themeMode === 'light' ? dictionary.themeDark : dictionary.themeLight}>
          {themeMode === 'light' ? <Moon /> : <Sun />}
        </ControlButton>
        <ControlButton $theme={theme} type="button" onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')} aria-label={language === 'fa' ? dictionary.languageEnglish : dictionary.languagePersian}>
          <Languages />
        </ControlButton>
      </ControlsGroup>
      <ProfileSection $theme={theme}>
        <ProfileAvatar $theme={theme}>
          <User size={20} strokeWidth={2} />
        </ProfileAvatar>
        <ProfileInfo $theme={theme}>
          <ProfileName $theme={theme}>مدیر سیستم</ProfileName>
          <ProfileRole $theme={theme}>{language === 'fa' ? 'مدیر سیستم' : 'System Admin'}</ProfileRole>
        </ProfileInfo>
      </ProfileSection>
    </SidebarContainer>
  )
}
