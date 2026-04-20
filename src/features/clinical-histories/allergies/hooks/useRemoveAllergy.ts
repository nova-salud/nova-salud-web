import { useAsyncAction } from '@/core/hooks/use-async-action'
import { allergyService } from '../services/allergy.service'

export const useRemoveAllergy = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    allergyService.remove.bind(allergyService),
    { successMessage: 'Alergia desactivada correctamente.' },
  )

  return {
    removeAllergy: execute,
    isLoading,
    error,
    clearError,
  }
}