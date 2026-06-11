import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { employeeRestrictionService } from '../services/employee-restriction.service'

export const useLiftRestriction = () => {
  const { execute, isLoading, error } = useAsyncAction<
    [number, string?],
    void
  >(
    employeeRestrictionService.lift.bind(employeeRestrictionService),
    {
      successMessage: 'Restricción levantada.',
    }
  )

  return {
    liftRestriction: execute,
    isLoading,
    error,
  }
}