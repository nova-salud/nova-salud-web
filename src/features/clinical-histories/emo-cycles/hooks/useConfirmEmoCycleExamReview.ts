import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useConfirmEmoCycleExamReview = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    ClinicalHistoryEmoCycleResponseDto
  >(
    clinicalHistoryEmoCycleService.confirmExamReview.bind(clinicalHistoryEmoCycleService),
    { successMessage: 'Exámenes confirmados. Ciclo EMO iniciado.' },
  )

  return {
    confirmExamReview: execute,
    isLoading,
    error,
    clearError,
  }
}
