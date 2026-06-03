import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { accidentService } from '../services/accident.service'

export const useAccidentsByClinicalHistory = (clinicalHistoryId: number) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      accidentService.findAll({ clinicalHistoryId, page, pageSize, sortBy: 'id', sortOrder: 'DESC' }),
    [clinicalHistoryId],
  )

  return usePaginatedQuery(fetcher)
}
