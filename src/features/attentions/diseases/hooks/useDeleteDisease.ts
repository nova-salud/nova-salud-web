import { useAsyncAction } from '@/core/hooks/use-async-action'
import { diseaseService } from '../services/disease.service'

export const useDeleteDisease = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    diseaseService.remove.bind(diseaseService),
    {
      successMessage: 'Enfermedad eliminada correctamente.',
    },
  )

  return {
    deleteDisease: async (id: number) => {
      const result = await execute(id)
      return result !== null
    },
    isLoading,
    error,
    clearError,
  }
}