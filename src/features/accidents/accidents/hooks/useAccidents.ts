import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { accidentService } from '../services/accident.service'
import type { FindAccidentsDto } from '../types/find-accidents.dto'

export const useAccidents = (query?: FindAccidentsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => accidentService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query?.pageSize)
}
