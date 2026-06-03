import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { movementService } from '../services/movement.service'
import type { FindInventoryMovementsDto } from '../types/find-inventory-movements.dto'

export const useMovements = (query: FindInventoryMovementsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => movementService.findAll({ ...query, page, pageSize }),
    [
      query.medicationId,
      query.medicationLotId,
      query.movementType,
      query.performedByUserId,
      query.sortBy,
      query.sortOrder,
    ],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
