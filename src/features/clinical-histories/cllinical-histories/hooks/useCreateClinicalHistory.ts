import { useAsyncAction } from '@/core/hooks/use-async-action'
import { clinicalHistoryService } from '../services/clinical-history.service'
import type {
  ClinicalHistoryResponseDto,
  CreateClinicalHistoryDto,
} from '../types'

export const useCreateClinicalHistory = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateClinicalHistoryDto],
    ClinicalHistoryResponseDto
  >(
    clinicalHistoryService.create.bind(clinicalHistoryService),
    {
      successMessage: 'Historia clínica creada correctamente.',
    },
  )

  return {
    createClinicalHistory: execute,
    isLoading,
    error,
    clearError,
  }
}