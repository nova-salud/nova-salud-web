import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { alertService } from '../services/alert.service'

export const useCreateAlert = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    alertService.resolve.bind(alertService),
    {
      successMessage: 'Alerta resuelta correctamente.',
    },
  )

  return {
    resolveAlert: execute,
    isLoading,
    error,
    clearError,
  }
}