import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../Dictionary/LanguageContext'
import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'
import { ROUTES } from '../../Routes/appRoutes'

const SidebarContainer = styled.aside<{ $theme: Theme }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  background-color: ${(props) => props.$theme.colors.surface};
  border-left: 1px solid ${(props) => props.$theme.colors.border};
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
  color: ${(props) => props.$theme.colors.text};
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
  color: ${(props) => props.$theme.colors.text};
  text-decoration: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.background};
  }

  &.active {
    background-color: ${(props) => props.$theme.colors.primary};
    color: #ffffff;
  }
`

interface SidebarProps {
  theme: Theme
}

export const Sidebar: React.FC<SidebarProps> = ({ theme }) => {
  const { dictionary } = useLanguage()

  const menuItems = [
    { path: ROUTES.DASHBOARD, key: 'dashboard' as const },
    { path: ROUTES.PRODUCTS, key: 'productsTitle' as const },
    { path: ROUTES.USERS, key: 'usersTitle' as const },
  ]

  return (
    <SidebarContainer $theme={theme}>
      <LogoBox $theme={theme}>
        <LogoText $theme={theme}>NOVA</LogoText>
      </LogoBox>
      <Menu $theme={theme}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            $theme={theme}
            end
          >
            {dictionary[item.key]}
          </MenuItem>
        ))}
      </Menu>
    </SidebarContainer>
  )
}
