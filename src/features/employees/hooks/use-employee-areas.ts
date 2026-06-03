import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { employeeAreaService } from '../services/employee-area.service'
import type { FindEmployeeAreasDto } from '../types/find-employee-areas.dto'

export const useEmployeeAreas = (query: FindEmployeeAreasDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => employeeAreaService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
