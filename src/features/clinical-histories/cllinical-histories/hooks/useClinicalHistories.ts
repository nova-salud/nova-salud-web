import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { clinicalHistoryService } from '../services/clinical-history.service'
import type { FindClinicalHistoriesDto } from '../types'

export const useClinicalHistories = (query: FindClinicalHistoriesDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => clinicalHistoryService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
