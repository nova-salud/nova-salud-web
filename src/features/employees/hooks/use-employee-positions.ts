import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { employeePositionService } from '../services/employee-position.service'
import type { FindEmployeePositionsDto } from '../types/find-employee-positions.dto'

export const useEmployeePositions = (query: FindEmployeePositionsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      employeePositionService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
