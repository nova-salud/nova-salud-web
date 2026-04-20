import { useAsyncAction } from '@/core/hooks/use-async-action'
import { clinicalHistoryExamService } from '../services/clinical-history-exam.service'

export const useRemoveClinicalHistoryExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    clinicalHistoryExamService.remove.bind(clinicalHistoryExamService),
    {
      successMessage: 'Examen eliminado correctamente.',
    },
  )

  return {
    removeClinicalHistoryExam: execute,
    isLoading,
    error,
    clearError,
  }
}