import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useGenerateNextEmoCycle = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    ClinicalHistoryEmoCycleResponseDto
  >(
    clinicalHistoryEmoCycleService.generateNext.bind(clinicalHistoryEmoCycleService),
    { successMessage: 'Nuevo ciclo EMO generado correctamente.' },
  )

  return { generateNextEmoCycle: execute, isLoading, error, clearError }
}
