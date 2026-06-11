import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { EmitClinicalHistoryConclusionDto } from '../types'

export const useEmitClinicalHistoryConclusion = () => {
  const { execute: emitClinicalHistoryConclusion, isLoading, error, clearError } = useAsyncAction(
    (id: number, dto: EmitClinicalHistoryConclusionDto) =>
      clinicalHistoryEmoCycleService.emitConclusion(id, dto),
  )
  return { emitClinicalHistoryConclusion, isLoading, error, clearError }
}
