import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'

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

interface HeaderProps {
  theme: Theme
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <HeaderContainer $theme={theme}>
      <Title $theme={theme}>NOVA Admin</Title>
      <Actions $theme={theme} />
    </HeaderContainer>
  )
}
