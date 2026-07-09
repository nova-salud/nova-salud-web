import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { allergyService } from '../services/allergy.service'

export const useRemoveAllergy = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    allergyService.remove.bind(allergyService),
    { successMessage: 'Alergia eliminada correctamente.' },
  )

  return {
    removeAllergy: execute,
    isLoading,
    error,
    clearError,
  }
}