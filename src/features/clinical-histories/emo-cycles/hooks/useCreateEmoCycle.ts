import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useCreateEmoCycle = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    ClinicalHistoryEmoCycleResponseDto
  >(
    clinicalHistoryEmoCycleService.create.bind(clinicalHistoryEmoCycleService),
    {
      successMessage: 'Ciclo emo registrado correctamente.',
    },
  )

  return {
    createEmoCycle: execute,
    isLoading,
    error,
    clearError,
  }
}