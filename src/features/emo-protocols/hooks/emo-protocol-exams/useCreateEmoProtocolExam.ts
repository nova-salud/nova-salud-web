import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { CreateEmoProtocolExamDto, EmoProtocolExamResponseDto } from '../../types'
import { emoProtocolExamService } from '../../services/emo-protocol-exam.service'

export const useCreateEmoProtocolExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateEmoProtocolExamDto],
    EmoProtocolExamResponseDto
  >(
    emoProtocolExamService.create.bind(emoProtocolExamService),
    {
      successMessage: 'Examen de protocolo EMO creado correctamente.',
    },
  )

  return {
    createEmoProtocolExam: execute,
    isLoading,
    error,
    clearError,
  }
}