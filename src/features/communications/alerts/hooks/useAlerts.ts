import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { alertService } from '../services/alert.service'
import type { FindAlertsDto } from '../types/find-alerts.dto'

export const useAlerts = (query?: FindAlertsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => alertService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query?.pageSize)
}
