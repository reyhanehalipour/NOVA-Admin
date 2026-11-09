import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const LayoutContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  min-width: 1280px;
  min-height: 100vh;
  background-color: ${(props) => props.$theme.colors.background};
  color: ${(props) => props.$theme.colors.text};
  direction: rtl;
`

const MainWrapper = styled.main<{ $theme: Theme }>`
  flex: 1;
  margin-right: 250px;
  padding: ${(props) => props.$theme.spacing.lg};
  min-height: calc(100vh - 72px);
`

interface AdminLayoutProps {
  theme: Theme
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ theme }) => {
  return (
    <LayoutContainer $theme={theme}>
      <Header theme={theme} />
      <Sidebar theme={theme} />
      <MainWrapper $theme={theme}>
        <Outlet />
      </MainWrapper>
    </LayoutContainer>
  )
}
