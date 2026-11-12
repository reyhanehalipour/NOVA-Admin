import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from '../theme/ThemeProvider'
import type { Theme } from '../theme/theme.types'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const LayoutContainer = styled.div<{ $theme: Theme }>`
  min-width: 1280px;
  min-height: 100vh;
  background-color: ${(props) => props.$theme.colors.background};
  color: ${(props) => props.$theme.colors.text};
`

const MainArea = styled.div`
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
`

const MainWrapper = styled.main<{ $theme: Theme }>`
  flex: 1;
  padding: ${(props) => props.$theme.spacing.lg};
  min-height: calc(100vh - 72px);
`

export const AdminLayout: React.FC = () => {
  const { theme } = useTheme()

  return (
    <LayoutContainer $theme={theme}>
      <Sidebar theme={theme} />
      <MainArea>
        <Header theme={theme} />
        <MainWrapper $theme={theme}>
          <Outlet />
        </MainWrapper>
      </MainArea>
    </LayoutContainer>
  )
}