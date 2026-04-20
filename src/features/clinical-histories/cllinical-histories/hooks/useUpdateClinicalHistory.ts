import { useAsyncAction } from '@/core/hooks/use-async-action'
import { clinicalHistoryService } from '../services/clinical-history.service'
import type {
  ClinicalHistoryResponseDto,
  UpdateClinicalHistoryDto,
} from '../types'

export const useUpdateClinicalHistory = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateClinicalHistoryDto],
    ClinicalHistoryResponseDto
  >(
    clinicalHistoryService.update.bind(clinicalHistoryService),
    {
      successMessage: 'Historia clínica actualizada correctamente.',
    },
  )

  return {
    updateClinicalHistory: execute,
    isLoading,
    error,
    clearError,
  }
}