import { useCallback, useEffect, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeAreaService } from '../services/employee-area.service'
import type { FindEmployeeAreasDto } from '../types/find-employee-areas.dto'
import type { EmployeeAreaResponseDto } from '../types/employee-area-response.dto'

type UseEmployeeAreasReturn = {
  data: EmployeeAreaResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useEmployeeAreas = (
  query: FindEmployeeAreasDto,
): UseEmployeeAreasReturn => {
  const [response, setResponse] = useState<PaginatedResponse<EmployeeAreaResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployeeAreas = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await employeeAreaService.findAll(query)
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
    void fetchEmployeeAreas()
  }, [fetchEmployeeAreas])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchEmployeeAreas,
  }
}