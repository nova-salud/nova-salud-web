import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { movementService } from '../services/movement.service'
import type { FindInventoryMovementsDto } from '../types/find-inventory-movements.dto'
import type { InventoryMovementResponseDto } from '../types/inventory-movement-response.dto'

type UseMovementsReturn = {
  data: InventoryMovementResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useMovements = (
  query: FindInventoryMovementsDto,
): UseMovementsReturn => {
  const [response, setResponse] = useState<PaginatedResponse<InventoryMovementResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMovements = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await movementService.findAll(query)
      setResponse(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener los movimientos.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener los movimientos.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchMovements()
  }, [
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortOrder,
    query.medicationId,
    query.medicationLotId,
    query.movementType,
    query.performedByUserId,
  ])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchMovements,
  }
}