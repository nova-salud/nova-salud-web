import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { dispensationService } from '../services/dispensation.service'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'
import type { FindDispensationsDto } from '../types/find-dispensations.dto'

type UseDispensationsReturn = {
  data: DispensationResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useDispensations = (
  query: FindDispensationsDto,
): UseDispensationsReturn => {
  const [response, setResponse] = useState<PaginatedResponse<DispensationResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDispensations = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.findAll(query)
      setResponse(result)
    } catch (err) {
      const backendError = err as BackendError
      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener las dispensaciones.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener las dispensaciones.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchDispensations()
  }, [
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortOrder,
    query.dispenseType,
    query.collaboratorDni,
    query.thirdPartyDni,
    query.attentionId,
    query.dispensedByUserId,
  ])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchDispensations,
  }
}