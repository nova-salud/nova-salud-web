import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { healthcareCenterService } from '../services/healthcare-center.service'
import type { FindHealthcareCentersDto } from '../types'

export const useHealthcareCenters = (query: FindHealthcareCentersDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => healthcareCenterService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
