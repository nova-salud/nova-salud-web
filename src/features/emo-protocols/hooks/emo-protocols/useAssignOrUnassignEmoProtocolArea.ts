import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { EmoProtocolResponseDto } from '../../types'
import { emoProtocolService } from '../../services/emo-protocol.service'

export const useAssignOrUnassignEmoProtocolArea = ({
  successMessage = 'Área asiganda/desasignada correctamente.'
}: { successMessage?: string }) => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, number],
    EmoProtocolResponseDto
  >(
    emoProtocolService.assignOrUnassignArea.bind(emoProtocolService),
    {
      successMessage,
    },
  )

  return {
    assignOrUnassignArea: execute,
    isLoading,
    error,
    clearError,
  }
}