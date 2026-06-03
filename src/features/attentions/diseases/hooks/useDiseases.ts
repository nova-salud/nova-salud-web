import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { diseaseService } from '../services/disease.service'
import type { FindDiseasesDto } from '../types'

export const useDiseases = (query: FindDiseasesDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => diseaseService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
