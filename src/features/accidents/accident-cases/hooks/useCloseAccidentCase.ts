import { useAsyncAction } from '@/core/hooks/use-async-action'
import { accidentCaseService } from '../services/accident-case.service'

export const useCloseAccidentCase = () => {
  const { execute, isLoading, error } = useAsyncAction<
    [number],
    void
  >(
    accidentCaseService.closeCase.bind(accidentCaseService),
    {
      successMessage: 'Accidente cerrado correctamente.',
    }
  )

  return {
    closeCase: execute,
    isLoading,
    error,
  }
}