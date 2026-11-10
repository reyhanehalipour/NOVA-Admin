import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { fetchUsersThunk } from '../../Redux/users/usersSlice'
import type { User } from '../../types/user.types'
import { ROUTES } from '../../Routes/appRoutes'
import styled from 'styled-components'
import type { Theme } from '../../Shared/theme/theme.types'
import { useTheme } from '../../Shared/theme/ThemeProvider'
import { useLanguage } from '../../Dictionary/LanguageContext'

const UsersContainer = styled.div<{ $theme: Theme }>`
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

const ActionButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${(props) => props.$theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const SearchContainer = styled.div<{ $theme: Theme }>`
  margin-bottom: ${(props) => props.$theme.spacing.lg};
`

const SearchInput = styled.input<{ $theme: Theme }>`
  width: 100%;
  max-width: 400px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.text};
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};

  &:focus {
    border-color: ${(props) => props.$theme.colors.primary};
    outline: none;
  }
`

const Table = styled.table<{ $theme: Theme }>`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  overflow: hidden;
`

const TableHeader = styled.thead<{ $theme: Theme }>`
  background-color: ${(props) => props.$theme.colors.background};
`

const TableHeaderCell = styled.th<{ $theme: Theme }>`
  padding: 0.75rem 1rem;
  text-align: right;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  border-bottom: 1px solid ${(props) => props.$theme.colors.border};
`

const TableBody = styled.tbody<{ $theme: Theme }>`
  tr {
    border-bottom: 1px solid ${(props) => props.$theme.colors.border};
    &:last-child {
      border-bottom: none;
    }
  }
`

const TableRow = styled.tr<{ $theme: Theme }>`
  &:hover {
    background-color: ${(props) => props.$theme.colors.background};
  }
`

const TableCell = styled.td<{ $theme: Theme }>`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.text};
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
  color: #ffffff;
  background-color: ${(props) => props.$theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

export const UsersList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { dictionary } = useLanguage()
  const { theme } = useTheme()
  const { items, fetchStatus, error } = useAppSelector((state) => state.users)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    dispatch(fetchUsersThunk())
  }, [dispatch])

  const filteredUsers = items.filter((user: User) => {
    const query = searchQuery.toLowerCase()
    return (
      user.name.firstname.toLowerCase().includes(query) ||
      user.name.lastname.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  })

  const isLoading = fetchStatus === 'loading'
  const isError = fetchStatus === 'failed'
  const isEmpty = items.length === 0 && !isLoading && !isError
  const isSearchEmpty = filteredUsers.length === 0 && searchQuery.length > 0 && !isLoading && !isError

  const handleRetry = () => {
    dispatch(fetchUsersThunk())
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <UsersContainer $theme={theme}>
      <PageHeader $theme={theme}>
        <div>
          <PageTitle $theme={theme}>{dictionary.usersTitle}</PageTitle>
          <PageSubtitle $theme={theme}>{dictionary.usersSubtitle}</PageSubtitle>
        </div>
        <ActionButton $theme={theme} type="button" onClick={() => navigate(ROUTES.CREATE_USER, { replace: true })}>
          + {dictionary.createUserTitle}
        </ActionButton>
      </PageHeader>

      <SearchContainer $theme={theme}>
        <SearchInput
          $theme={theme}
          type="text"
          placeholder={dictionary.usersSearchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      {isLoading ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.loading}</StatusTitle>
        </StatusBox>
      ) : isError ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.usersError}</StatusTitle>
          <StatusMessage $theme={theme}>{error}</StatusMessage>
          <RetryButton $theme={theme} onClick={handleRetry}>
            {dictionary.usersRetry}
          </RetryButton>
        </StatusBox>
      ) : isSearchEmpty ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.usersSearchEmpty}</StatusTitle>
        </StatusBox>
      ) : isEmpty ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.usersNotFound}</StatusTitle>
        </StatusBox>
      ) : (
        <Table $theme={theme}>
          <TableHeader $theme={theme}>
            <tr>
              <TableHeaderCell $theme={theme}>{dictionary.usersNameCol}</TableHeaderCell>
              <TableHeaderCell $theme={theme}>{dictionary.usersUsernameCol}</TableHeaderCell>
              <TableHeaderCell $theme={theme}>{dictionary.usersEmailCol}</TableHeaderCell>
              <TableHeaderCell $theme={theme}>{dictionary.usersPhoneCol}</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody $theme={theme}>
            {filteredUsers.map((user: User) => (
              <TableRow key={user.id} $theme={theme}>
                <TableCell $theme={theme}>{user.name.firstname} {user.name.lastname}</TableCell>
                <TableCell $theme={theme}>{user.username}</TableCell>
                <TableCell $theme={theme}>{user.email}</TableCell>
                <TableCell $theme={theme}>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </UsersContainer>
  )
}
