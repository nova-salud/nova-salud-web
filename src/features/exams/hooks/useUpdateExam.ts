import { useAsyncAction } from '@/core/hooks/use-async-action'
import { examService } from '../services/exam.service'
import type { UpdateExamDto, ExamResponseDto } from '../types'

export const useUpdateExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateExamDto],
    ExamResponseDto
  >(
    examService.update.bind(examService),
    {
      successMessage: 'Exámen actualizada correctamente.',
    },
  )

  return {
    updateExam: execute,
    isLoading,
    error,
    clearError,
  }
}