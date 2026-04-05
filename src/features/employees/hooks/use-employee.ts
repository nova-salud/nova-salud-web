import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { employeeService } from '../services/employee.service'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

type UseEmployeeReturn = {
  data: EmployeeResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useEmployee = (id: number): UseEmployeeReturn => {
  const [data, setData] = useState<EmployeeResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployee = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await employeeService.findById(id)
      setData(result)
    } catch (error) {
      const message = parseBackendError(error)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchEmployee()
    }
  }, [id, fetchEmployee])

  return {
    data,
    isLoading,
    error,
    refetch: fetchEmployee,
  }
}