import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { clinicalHistoryService } from '../services/clinical-history.service'
import type { ClinicalHistoryListItemDto, FindClinicalHistoriesDto } from '../types'

export const useClinicalHistories = (query: FindClinicalHistoriesDto) => {
  const [response, setResponse] = useState<PaginatedResponse<ClinicalHistoryListItemDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClinicalHistories = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await clinicalHistoryService.findAll(query)
      setResponse(result)
    } catch (err) {
      const message = parseBackendError(err)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchClinicalHistories()
  }, [fetchClinicalHistories])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchClinicalHistories,
  }
}
