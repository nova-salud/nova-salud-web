import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { employeeService } from '../services/employee.service'
import type { FindEmployeesDto } from '../types/find-employees.dto'

export const useEmployees = (query: FindEmployeesDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => employeeService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
