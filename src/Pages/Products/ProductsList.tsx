import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { fetchProductsThunk } from '../../Redux/products/productsSlice'
import type { Product } from '../../types/product.types'
import { ROUTES } from '../../Routes/appRoutes'
import styled from 'styled-components'
import type { Theme } from '../../Shared/theme/theme.types'
import { useTheme } from '../../Shared/theme/ThemeProvider'
import { useLanguage } from '../../Dictionary/LanguageContext'
import { usePagination } from '../../Shared/hooks/usePagination'
import { Pagination } from '../../Shared/components/Pagination'
import { PrimaryButton } from '../../Shared/components/PrimaryButton'

const PAGE_SIZE = 5

const ProductsContainer = styled.div<{ $theme: Theme }>`
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

const ProductImage = styled.img<{ $theme: Theme }>`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid ${(props) => props.$theme.colors.border};
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

export const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { dictionary } = useLanguage()
  const { theme } = useTheme()
  const { items, fetchStatus, error } = useAppSelector((state) => state.products)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [dispatch])

  const filteredProducts = items.filter((product: Product) => {
    const query = searchQuery.toLowerCase()
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  })

  const {
    currentPage,
    totalPages,
    paginatedData,
    rangeStart,
    rangeEnd,
    totalItems,
    canPrev,
    canNext,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({ data: filteredProducts, pageSize: PAGE_SIZE, resetKey: searchQuery })

  const isLoading = fetchStatus === 'loading'
  const isError = fetchStatus === 'failed'
  const isEmpty = items.length === 0 && !isLoading && !isError
  const isSearchEmpty = filteredProducts.length === 0 && searchQuery.length > 0 && !isLoading && !isError

  const handleRetry = () => {
    dispatch(fetchProductsThunk())
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <ProductsContainer $theme={theme}>
      <PageHeader $theme={theme}>
        <div>
          <PageTitle $theme={theme}>{dictionary.productsTitle}</PageTitle>
          <PageSubtitle $theme={theme}>{dictionary.productsSubtitle}</PageSubtitle>
        </div>
        <PrimaryButton $theme={theme} type="button" onClick={() => navigate(ROUTES.CREATE_PRODUCT, { replace: true })}>
          + {dictionary.createProductTitle}
        </PrimaryButton>
      </PageHeader>

      <SearchContainer $theme={theme}>
        <SearchInput
          $theme={theme}
          type="text"
          placeholder={dictionary.productsSearchPlaceholder}
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
          <StatusTitle $theme={theme}>{dictionary.productsError}</StatusTitle>
          <StatusMessage $theme={theme}>{error}</StatusMessage>
          <RetryButton $theme={theme} onClick={handleRetry}>
            {dictionary.productsRetry}
          </RetryButton>
        </StatusBox>
      ) : isSearchEmpty ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.productsSearchEmpty}</StatusTitle>
        </StatusBox>
      ) : isEmpty ? (
        <StatusBox $theme={theme}>
          <StatusTitle $theme={theme}>{dictionary.productsNotFound}</StatusTitle>
        </StatusBox>
      ) : (
        <>
          <Table $theme={theme}>
            <TableHeader $theme={theme}>
              <tr>
                <TableHeaderCell $theme={theme}>{dictionary.productsImage}</TableHeaderCell>
                <TableHeaderCell $theme={theme}>{dictionary.productsTitleCol}</TableHeaderCell>
                <TableHeaderCell $theme={theme}>{dictionary.productsPriceCol}</TableHeaderCell>
                <TableHeaderCell $theme={theme}>{dictionary.productsCategoryCol}</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody $theme={theme}>
              {paginatedData.map((product: Product) => (
                <TableRow key={product.id} $theme={theme}>
                  <TableCell $theme={theme}>
                    <ProductImage $theme={theme} src={product.image} alt={product.title} />
                  </TableCell>
                  <TableCell $theme={theme}>{product.title}</TableCell>
                  <TableCell $theme={theme}>{product.price.toLocaleString()}</TableCell>
                  <TableCell $theme={theme}>{product.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            theme={theme}
            currentPage={currentPage}
            totalPages={totalPages}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            totalItems={totalItems}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={prevPage}
            onNext={nextPage}
            onPageChange={goToPage}
          />
        </>
      )}
    </ProductsContainer>
  )
}
