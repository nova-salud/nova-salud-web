import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { employeeService } from '../services/employee.service'
import type { FindEmployeesDto } from '../types/find-employees.dto'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

type UseEmployeesReturn = {
  data: EmployeeResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useEmployees = (
  query: FindEmployeesDto,
): UseEmployeesReturn => {
  const [response, setResponse] = useState<PaginatedResponse<EmployeeResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployees = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await employeeService.findAll(query)
      setResponse(result)
    } catch (error) {
      const message = parseBackendError(error)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchEmployees()
  }, [fetchEmployees])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchEmployees,
  }
}