import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { CancelEmoCycleDto, ClinicalHistoryEmoCycleResponseDto } from '../types'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useCancelEmoCycle = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, CancelEmoCycleDto],
    ClinicalHistoryEmoCycleResponseDto
  >(
    clinicalHistoryEmoCycleService.cancel.bind(clinicalHistoryEmoCycleService),
    { successMessage: 'Ciclo EMO cancelado correctamente.' },
  )

  return { cancelEmoCycle: execute, isLoading, error, clearError }
}
