import { useAsyncAction } from '@/core/hooks/use-async-action'
import { clinicalHistoryExamService } from '../services/clinical-history-exam.service'
import type { CompleteClinicalHistoryExamDto, ClinicalHistoryExamResponseDto } from '../types'

export const useCompleteClinicalHistoryExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, CompleteClinicalHistoryExamDto, File],
    ClinicalHistoryExamResponseDto
  >(
    clinicalHistoryExamService.complete.bind(clinicalHistoryExamService),
    {
      successMessage: 'Examen completado correctamente.',
    },
  )

  return {
    completeClinicalHistoryExam: execute,
    isLoading,
    error,
    clearError,
  }
}