import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { emoProtocolExamService } from '../../services/emo-protocol-exam.service'

export const useRemoveEmoProtocolExam = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    emoProtocolExamService.remove.bind(emoProtocolExamService),
    {
      successMessage: 'Examen de protocolo EMO eliminado correctamente.',
    },
  )

  return {
    removeEmoProtocolExam: execute,
    isLoading,
    error,
    clearError,
  }
}