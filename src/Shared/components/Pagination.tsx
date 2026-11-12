import { ChevronLeft, ChevronRight } from 'lucide-react'
import styled from 'styled-components'
import { useLanguage } from '../../Dictionary/LanguageContext'
import type { Theme } from '../theme/theme.types'

const PaginationContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.$theme.spacing.md};
  margin-top: ${(props) => props.$theme.spacing.md};
  flex-wrap: wrap;
`

const RangeInfo = styled.span<{ $theme: Theme }>`
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.secondary};
`

const Controls = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$theme.spacing.xs};
`

const PageButton = styled.button<{ $theme: Theme; $active: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 ${(props) => props.$theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$active ? 600 : 500)};
  color: ${(props) => (props.$active ? props.$theme.colors.onPrimary : props.$theme.colors.text)};
  background-color: ${(props) => (props.$active ? props.$theme.colors.primary : 'transparent')};
  border: 1px solid ${(props) => (props.$active ? props.$theme.colors.primary : props.$theme.colors.border)};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover:not(:disabled) {
    border-color: ${(props) => props.$theme.colors.primary};
  }
`

const NavButton = styled.button<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${(props) => props.$theme.colors.text};
  background-color: transparent;
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  svg {
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.$theme.colors.text};
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.$theme.colors.primary};

    svg {
      stroke: ${(props) => props.$theme.colors.primary};
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

interface PaginationProps {
  theme: Theme
  currentPage: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  totalItems: number
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  theme,
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  totalItems,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onPageChange,
}) => {
  const { language, dictionary } = useLanguage()

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  const PrevIcon = language === 'fa' ? ChevronRight : ChevronLeft
  const NextIcon = language === 'fa' ? ChevronLeft : ChevronRight

  return (
    <PaginationContainer $theme={theme}>
      <RangeInfo $theme={theme}>
        {dictionary.paginationShowing} {rangeStart}–{rangeEnd} {dictionary.paginationOf} {totalItems}
      </RangeInfo>
      <Controls $theme={theme}>
        <NavButton
          $theme={theme}
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label={dictionary.paginationPrevious}
        >
          <PrevIcon />
        </NavButton>
        {pages.map((page) => (
          <PageButton
            key={page}
            $theme={theme}
            $active={page === currentPage}
            type="button"
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ))}
        <NavButton
          $theme={theme}
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label={dictionary.paginationNext}
        >
          <NextIcon />
        </NavButton>
      </Controls>
    </PaginationContainer>
  )
}