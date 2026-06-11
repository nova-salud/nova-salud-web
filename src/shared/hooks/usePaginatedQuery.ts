import { useState } from 'react'
import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { QueryParams, SortOrder } from '../../core/types/query-params.type'

const DEFAULT_PAGE_SIZE = 10

type ExtraFilters<K extends QueryParams> = Omit<K, keyof QueryParams>

type PaginatedQueryOptions<T, K extends QueryParams> = Omit<UseQueryOptions<PaginatedResponse<T>>, 'queryFn'> & {
  queryFn: (filters: K) => Promise<PaginatedResponse<T>>
  defaultPage?: number
  defaultPageSize?: number
  defaultSortBy?: keyof T
  defaultSortOrder?: SortOrder
  defaultFilters?: ExtraFilters<K>
}

export const usePaginatedQuery = <T, K extends QueryParams>({
  queryFn,
  queryKey,
  defaultPage = 1,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  defaultSortBy = 'id' as keyof T,
  defaultSortOrder = 'DESC',
  defaultFilters,
  ...options
}: PaginatedQueryOptions<T, K>) => {
  const [page, setPage] = useState<number>(defaultPage)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize)
  const [sortBy, setSortBy] = useState<keyof T>(defaultSortBy)
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder)
  const [extraFilters, setExtraFilters] = useState<ExtraFilters<K>>(defaultFilters ?? {} as ExtraFilters<K>)

  const filters = {
    ...extraFilters,
    page,
    pageSize,
    sortBy,
    sortOrder,
  } as K

  const { data: response, isFetching, error, refetch } = useQuery({
    ...options,
    queryKey: [...(queryKey as unknown[]), filters],
    queryFn: async () => {
      try {
        return await queryFn(filters)
      } catch (error) {
        const message = parseBackendError(error)
        throw new Error(message, { cause: error })
      }
    }
  })

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  return {
    data: response?.data ?? [],
    pagination: {
      page,
      pageSize,
      totalPages: response?.totalPages ?? 0,
      total: response?.total ?? 0,
      onPaginationChange
    },
    isLoading: isFetching,
    error: error?.message ?? null,
    goToPage: setPage,
    setSortOrder,
    setSortBy,
    setPageSize,
    setFilters: setExtraFilters,
    refetch: async () => { await refetch() },
  }
}
