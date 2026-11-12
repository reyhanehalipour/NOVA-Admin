import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { fetchProductsThunk } from '../../Redux/products/productsSlice'
import { fetchUsersThunk } from '../../Redux/users/usersSlice'
import { ROUTES } from '../../Routes/appRoutes'
import styled from 'styled-components'
import type { Theme } from '../../Shared/theme/theme.types'
import { useTheme } from '../../Shared/theme/ThemeProvider'
import { useLanguage } from '../../Dictionary/LanguageContext'

const DashboardContainer = styled.div<{ $theme: Theme }>`
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${(props) => props.$theme.colors.background};
  color: ${(props) => props.$theme.colors.text};
`

const PageHeader = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.$theme.spacing.lg};
`

const PageTitle = styled.h2<{ $theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  margin: 0;
`

const PageSubtitle = styled.p<{ $theme: Theme }>`
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.secondary};
  margin: 0;
`

const StatsGrid = styled.div<{ $theme: Theme }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => props.$theme.spacing.lg};
  margin-bottom: ${(props) => props.$theme.spacing.lg};
`

const StatCard = styled.div<{ $theme: Theme }>`
  padding: ${(props) => props.$theme.spacing.lg};
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$theme.spacing.sm};
`

const StatLabel = styled.div<{ $theme: Theme }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.secondary};
`

const StatValue = styled.div<{ $theme: Theme }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.$theme.colors.text};
`

const QuickActions = styled.div<{ $theme: Theme }>`
  padding: ${(props) => props.$theme.spacing.lg};
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.lg};
`

const SectionTitle = styled.h3<{ $theme: Theme }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  margin: 0 0 ${(props) => props.$theme.spacing.md} 0;
`

const ActionGrid = styled.div<{ $theme: Theme }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => props.$theme.spacing.md};
`

const ActionCard = styled.a<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.md};
  padding: ${(props) => props.$theme.spacing.md};
  background-color: ${(props) => props.$theme.colors.background};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  color: ${(props) => props.$theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.surface};
    border-color: ${(props) => props.$theme.colors.primary};
  }
`

const ActionIcon = styled.span<{ $theme: Theme }>`
  font-size: 1.5rem;
`

const ActionTitle = styled.div<{ $theme: Theme }>`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
`

const ActionDescription = styled.div<{ $theme: Theme }>`
  font-size: 0.75rem;
  color: ${(props) => props.$theme.colors.secondary};
`

const StatusBox = styled.div<{ $theme: Theme }>`
  padding: ${(props) => props.$theme.spacing.lg};
  text-align: center;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
`

const StatusTitle = styled.h3<{ $theme: Theme }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  margin: 0 0 0.5rem 0;
`

const StatusMessage = styled.p<{ $theme: Theme }>`
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.secondary};
  margin: 0 0 1rem 0;
`

const RetryButton = styled.button<{ $theme: Theme }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.onPrimary};
  background-color: ${(props) => props.$theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { dictionary } = useLanguage()
  const { theme } = useTheme()
  const { items: products, fetchStatus: productsStatus, error: productsError } = useAppSelector((state) => state.products)
  const { items: users, fetchStatus: usersStatus, error: usersError } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchProductsThunk())
    dispatch(fetchUsersThunk())
  }, [dispatch])

  const isLoading = productsStatus === 'loading' || usersStatus === 'loading'
  const isError = productsStatus === 'failed' || usersStatus === 'failed'

  const productCount = products.length
  const userCount = users.length

  const handleRetry = () => {
    dispatch(fetchProductsThunk())
    dispatch(fetchUsersThunk())
  }

  return (
    <DashboardContainer $theme={theme}>
      <PageHeader $theme={theme}>
        <div>
          <PageTitle $theme={theme}>{dictionary.dashboard}</PageTitle>
          <PageSubtitle $theme={theme}>{dictionary.dashboardSubtitle}</PageSubtitle>
        </div>
      </PageHeader>

      {isLoading ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.loading}</StatusTitle>
        </StatusBox>
      ) : isError ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.error}</StatusTitle>
          <StatusMessage $theme={theme}>{productsError || usersError || dictionary.error}</StatusMessage>
          <RetryButton $theme={theme} onClick={handleRetry}>
            {dictionary.productsRetry}
          </RetryButton>
        </StatusBox>
      ) : (
        <>
          <StatsGrid $theme={theme}>
            <StatCard $theme={theme}>
              <StatLabel $theme={theme}>{dictionary.totalProducts}</StatLabel>
              <StatValue $theme={theme}>{productCount}</StatValue>
            </StatCard>
            <StatCard $theme={theme}>
              <StatLabel $theme={theme}>{dictionary.totalUsers}</StatLabel>
              <StatValue $theme={theme}>{userCount}</StatValue>
            </StatCard>
          </StatsGrid>

          <QuickActions $theme={theme}>
            <SectionTitle $theme={theme}>{dictionary.quickActions}</SectionTitle>
            <ActionGrid $theme={theme}>
              <ActionCard $theme={theme} href={ROUTES.PRODUCTS} onClick={(e) => { e.preventDefault(); navigate(ROUTES.PRODUCTS, { replace: true }) }}>
                <ActionIcon $theme={theme}>📦</ActionIcon>
                <div>
                  <ActionTitle $theme={theme}>{dictionary.productsTitle}</ActionTitle>
                  <ActionDescription $theme={theme}>{dictionary.viewProducts}</ActionDescription>
                </div>
              </ActionCard>
              <ActionCard $theme={theme} href={ROUTES.USERS} onClick={(e) => { e.preventDefault(); navigate(ROUTES.USERS, { replace: true }) }}>
                <ActionIcon $theme={theme}>👥</ActionIcon>
                <div>
                  <ActionTitle $theme={theme}>{dictionary.usersTitle}</ActionTitle>
                  <ActionDescription $theme={theme}>{dictionary.viewUsers}</ActionDescription>
                </div>
              </ActionCard>
            </ActionGrid>
          </QuickActions>
        </>
      )}
    </DashboardContainer>
  )
}
