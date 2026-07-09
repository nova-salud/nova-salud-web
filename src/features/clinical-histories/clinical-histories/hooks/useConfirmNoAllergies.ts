import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { clinicalHistoryService } from '../services/clinical-history.service'

export const useConfirmNoAllergies = () => {
  const { execute: confirmNoAllergies, isLoading, error, clearError } = useAsyncAction(
    (id: number) => clinicalHistoryService.confirmNoAllergies(id),
    { successMessage: 'Se confirmó que el paciente no tiene alergias.' },
  )
  return { confirmNoAllergies, isLoading, error, clearError }
}
