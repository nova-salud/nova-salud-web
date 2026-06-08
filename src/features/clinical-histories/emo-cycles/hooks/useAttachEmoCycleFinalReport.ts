import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useAttachEmoCycleFinalReport = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, File],
    ClinicalHistoryEmoCycleResponseDto
  >(
    clinicalHistoryEmoCycleService.attachFinalReport.bind(clinicalHistoryEmoCycleService),
    { successMessage: 'Informe médico adjuntado correctamente.' },
  )

  return { attachFinalReport: execute, isLoading, error, clearError }
}
