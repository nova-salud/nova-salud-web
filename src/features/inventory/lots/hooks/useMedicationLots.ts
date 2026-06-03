import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { lotService } from '../services/lot.service'

export const useMedicationLots = (medicationId: number) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      lotService.findAll({ medicationId, page, pageSize, sortBy: 'expirationDate', sortOrder: 'ASC' }),
    [medicationId],
  )

  return usePaginatedQuery(fetcher, 50)
}
