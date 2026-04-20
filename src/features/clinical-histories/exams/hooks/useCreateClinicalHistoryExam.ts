import { useAsyncAction } from '@/core/hooks/use-async-action'
import { clinicalHistoryExamService } from '../services/clinical-history-exam.service'
import type {  ClinicalHistoryExamResponseDto, CreateClinicalHistoryExamDto } from '../types'

export const useCreateClinicalHistoryExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateClinicalHistoryExamDto],
    ClinicalHistoryExamResponseDto
  >(
    clinicalHistoryExamService.create.bind(clinicalHistoryExamService),
    {
      successMessage: 'Examen registrado correctamente.',
    },
  )

  return {
    createClinicalHistoryExam: execute,
    isLoading,
    error,
    clearError,
  }
}