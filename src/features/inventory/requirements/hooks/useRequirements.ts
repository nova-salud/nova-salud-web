import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { requirementService } from '../services/requirement.service'
import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

type UseRequirementsReturn = {
  data: InventoryRequirementResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useRequirements = (
  query: FindInventoryRequirementsDto,
): UseRequirementsReturn => {
  const [response, setResponse] = useState<PaginatedResponse<InventoryRequirementResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequirements = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await requirementService.findAll(query)
      setResponse(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener los requerimientos.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener los requerimientos.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchRequirements()
  }, [
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortOrder,
    query.status,
    query.requestedByUserId,
    query.deliveredByUserId,
  ])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchRequirements,
  }
}