import { useEffect, useRef, useState } from 'react'
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

const AvatarButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.$theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.full};
  cursor: pointer;
  transition: opacity 0.2s;
  position: relative;

  svg {
    width: 18px;
    height: 18px;
    stroke: ${(props) => props.$theme.colors.onPrimary};
  }

  &:hover {
    opacity: 0.9;
  }
`

const ProfileWrapper = styled.div`
  position: relative;
`

const Dropdown = styled.div<{ $theme: Theme }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.$theme.spacing.xs};
  z-index: 200;
`

const DropdownItem = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.sm};
  width: 100%;
  padding: ${(props) => props.$theme.spacing.sm} ${(props) => props.$theme.spacing.md};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  background-color: transparent;
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.$theme.colors.text};
  }

  &:hover {
    background-color: ${(props) => props.$theme.colors.background};
  }
`

interface HeaderProps {
  theme: Theme
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  const { dictionary } = useLanguage()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate(ROUTES.LOGIN, { replace: true })
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
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
        <WelcomeText $theme={theme}>{dictionary.welcomeMessage}</WelcomeText>
        <ProfileWrapper ref={dropdownRef}>
          <AvatarButton $theme={theme} type="button" onClick={toggleDropdown} aria-label={dictionary.appName}>
            <User />
          </AvatarButton>
          {isDropdownOpen && (
            <Dropdown $theme={theme}>
              <DropdownItem $theme={theme} type="button" onClick={handleLogout}>
                <LogOut />
                {dictionary.logout}
              </DropdownItem>
            </Dropdown>
          )}
        </ProfileWrapper>
      </RightGroup>
    </HeaderContainer>
  )
}