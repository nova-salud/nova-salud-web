import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { clinicalHistoryExamService, type CompleteClinicalHistoryExamDto } from '../services/clinical-history-exam.service'

export const useCompleteClinicalHistoryExam = () => {
  const { execute, isLoading, error } = useAsyncAction(
    (id: number, dto: CompleteClinicalHistoryExamDto, file: File) =>
      clinicalHistoryExamService.complete(id, dto, file),
  )

  return {
    isLoading,
    error,
    completeClinicalHistoryExam: execute,
  }
}
