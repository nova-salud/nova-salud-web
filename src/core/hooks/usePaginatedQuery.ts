import { useState, useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { getFnId } from '@/core/utils/fn-id'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'

const DEFAULT_PAGE_SIZE = 10

export const usePaginatedQuery = <T>(
  fetcher: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [fetcher])

  const { data: response, isFetching, error, refetch } = useQuery({
    queryKey: [getFnId(fetcher), page, pageSize],
    queryFn: () => fetcher(page, pageSize),
    placeholderData: keepPreviousData,
    retry: false,
  })

  return {
    data: response?.data ?? [],
    total: response?.total ?? 0,
    page: response?.page ?? page,
    pageSize: response?.pageSize ?? pageSize,
    totalPages: response?.totalPages ?? 0,
    isLoading: isFetching,
    error: error ? parseBackendError(error) : null,
    goToPage: setPage,
    refetch: async () => { await refetch() },
  }
}
