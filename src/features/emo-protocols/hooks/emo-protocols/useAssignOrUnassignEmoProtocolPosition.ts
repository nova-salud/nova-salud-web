import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { EmoProtocolResponseDto } from '../../types'
import { emoProtocolService } from '../../services/emo-protocol.service'

export const useAssignOrUnassignEmoProtocolPosition = ({
  successMessage = 'Puesto asignado/desasignado correctamente.',
}: { successMessage?: string } = {}) => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, number],
    EmoProtocolResponseDto
  >(
    emoProtocolService.assignOrUnassignPosition.bind(emoProtocolService),
    { successMessage },
  )

  return {
    assignOrUnassignPosition: execute,
    isLoading,
    error,
    clearError,
  }
}
