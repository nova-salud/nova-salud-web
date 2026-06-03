import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { movementService } from '../services/movement.service'

export const useMedicationMovements = (medicationId: number) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      movementService.findAll({ medicationId, page, pageSize, sortBy: 'createdAt', sortOrder: 'DESC' }),
    [medicationId],
  )

  return usePaginatedQuery(fetcher, 50)
}
