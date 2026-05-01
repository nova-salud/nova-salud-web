import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { CreateEmployeeRestrictionDto } from '../types/create-employee-restriction.dto'
import type { EmployeeRestrictionResponseDto } from '../types/employee-restriction-response.dto'
import { employeeRestrictionService } from '../services/employee-restriction.service'

export const useCreateEmployeeRestriction = () => {
  const { execute, isLoading, error } = useAsyncAction<
    [CreateEmployeeRestrictionDto],
    EmployeeRestrictionResponseDto
  >(
    employeeRestrictionService.create.bind(employeeRestrictionService),
    {
      successMessage: 'Restricción creada correctamente.',
    }
  )

  return {
    createRestriction: execute,
    isLoading,
    error,
  }
}