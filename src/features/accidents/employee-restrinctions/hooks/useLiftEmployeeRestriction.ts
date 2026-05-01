import { useAsyncAction } from '@/core/hooks/use-async-action'
import { employeeRestrictionService } from '../services/employee-restriction.service'

export const useLiftRestriction = () => {
  const { execute, isLoading, error } = useAsyncAction<
    [number],
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