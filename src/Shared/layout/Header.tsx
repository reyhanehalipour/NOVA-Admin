import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../Dictionary/LanguageContext'
import { useAppDispatch } from '../../Redux/hooks'
import { logoutAction } from '../../Redux/auth/authSlice'
import { Bell, LogOut, Menu as MenuIcon, User } from 'lucide-react'
import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'
import { ROUTES } from '../../Routes/appRoutes'

const HeaderContainer = styled.header<{ $theme: Theme }>`
  position: sticky;
  top: 0;
  left: 250px;
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

const LeftGroup = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.sm};
`

const RightGroup = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.md};
`

const WelcomeText = styled.span<{ $theme: Theme }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
`

const IconButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: ${(props) => props.$theme.colors.text};
  background-color: transparent;
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    width: 20px;
    height: 20px;
    stroke: ${(props) => props.$theme.colors.text};
  }

  &:hover {
    background-color: ${(props) => props.$theme.colors.surface};
  }
`

const Avatar = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.$theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.full};
  position: relative;

  svg {
    width: 18px;
    height: 18px;
    stroke: ${(props) => props.$theme.colors.onPrimary};
  }
`

const UserSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

const LogoutButton = styled.button<{ $theme: Theme }>`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.xs};
  padding: 0;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  color: ${(props) => props.$theme.colors.secondary};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  svg {
    width: 12px;
    height: 12px;
    stroke: currentColor;
  }

  &:hover {
    color: ${(props) => props.$theme.colors.primary};
  }
`

interface HeaderProps {
  theme: Theme
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { dictionary } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <HeaderContainer $theme={theme}>
      <LeftGroup $theme={theme}>
        <IconButton $theme={theme} type="button" aria-label={dictionary.menuLabel}>
          <MenuIcon />
        </IconButton>
        <IconButton $theme={theme} type="button" aria-label={dictionary.notificationsLabel}>
          <Bell />
        </IconButton>
      </LeftGroup>
      <RightGroup $theme={theme}>
        <UserSummary>
          <WelcomeText $theme={theme}>{dictionary.welcomeMessage}</WelcomeText>
          <LogoutButton $theme={theme} type="button" onClick={handleLogout} aria-label={dictionary.logout}>
            <LogOut />
            {dictionary.logout}
          </LogoutButton>
        </UserSummary>
        <Avatar $theme={theme}>
          <User />
        </Avatar>
      </RightGroup>
    </HeaderContainer>
  )
}