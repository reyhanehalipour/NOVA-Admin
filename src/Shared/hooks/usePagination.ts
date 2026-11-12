import { useEffect, useMemo, useState } from 'react'

export interface UsePaginationParams<T> {
  data: T[]
  pageSize?: number
  resetKey?: string
}

export interface PaginationResult<T> {
  currentPage: number
  totalPages: number
  paginatedData: T[]
  rangeStart: number
  rangeEnd: number
  totalItems: number
  canPrev: boolean
  canNext: boolean
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}

export const usePagination = <T>({
  data,
  pageSize = 5,
  resetKey,
}: UsePaginationParams<T>): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = data.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    setCurrentPage(1)
  }, [resetKey])

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages))
  }, [totalPages])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, totalItems)
  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  const nextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  return {
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
  }
}