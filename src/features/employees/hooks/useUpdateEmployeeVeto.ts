import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { employeeService } from '../services/employee.service'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

export const useUpdateEmployeeVeto = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, { isVetoed: boolean }],
    EmployeeResponseDto
  >(
    employeeService.updateVeto.bind(employeeService),
    {
      successMessage: 'Estado de veto actualizado correctamente.',
    },
  )

  return {
    updateVeto: execute,
    isLoading,
    error,
    clearError,
  }
}
