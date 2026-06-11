import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { SignClinicalHistoryConformityDto } from '../types'

export const useSignClinicalHistoryConformity = () => {
  const { execute: signClinicalHistoryConformity, isLoading, error, clearError } = useAsyncAction(
    (id: number, dto: SignClinicalHistoryConformityDto) =>
      clinicalHistoryEmoCycleService.signConformity(id, dto),
  )

  return { signClinicalHistoryConformity, isLoading, error, clearError }
}
