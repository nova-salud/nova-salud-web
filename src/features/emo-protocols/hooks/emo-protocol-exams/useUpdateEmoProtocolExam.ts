import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { UpdateEmoProtocolExamDto, EmoProtocolExamResponseDto } from '../../types'
import { emoProtocolExamService } from '../../services/emo-protocol-exam.service'

export const useUpdateEmoProtocolExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateEmoProtocolExamDto],
    EmoProtocolExamResponseDto
  >(
    emoProtocolExamService.update.bind(emoProtocolExamService),
    {
      successMessage: 'Examen de protocolo EMO actualizado correctamente.',
    },
  )

  return {
    updateEmoProtocolExam: execute,
    isLoading,
    error,
    clearError,
  }
}