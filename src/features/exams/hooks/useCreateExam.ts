import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { CreateExamDto, ExamResponseDto } from '../types'
import { examService } from '../services/exam.service'

export const useCreateExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateExamDto],
    ExamResponseDto
  >(
    examService.create.bind(examService),
    {
      successMessage: 'Exámen creado correctamente.',
    },
  )

  return {
    createExam: execute,
    isLoading,
    error,
    clearError,
  }
}