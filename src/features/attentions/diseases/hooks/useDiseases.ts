import { useCallback, useEffect, useState } from 'react'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { diseaseService } from '../services/disease.service'
import type { DiseaseResponseDto, FindDiseasesDto } from '../types'

type UseDiseasesReturn = {
  data: DiseaseResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useDiseases = (
  query: FindDiseasesDto,
): UseDiseasesReturn => {
  const [response, setResponse] = useState<PaginatedResponse<DiseaseResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDiseases = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await diseaseService.findAll(query)
      setResponse(result)
    } catch (error) {
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchDiseases()
  }, [fetchDiseases])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchDiseases,
  }
}