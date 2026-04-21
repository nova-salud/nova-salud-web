import { useAsyncAction } from '@/core/hooks/use-async-action'
import { emoProtocolService } from '../../services/emo-protocol.service'
import type { UpdateEmoProtocolDto, EmoProtocolResponseDto } from '../../types'

export const useUpdateEmoProtocol = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateEmoProtocolDto],
    EmoProtocolResponseDto
  >(
    emoProtocolService.update.bind(emoProtocolService),
    {
      successMessage: 'Protocolo EMO actualizado correctamente.',
    },
  )

  return {
    updateEmoProtocol: execute,
    isLoading,
    error,
    clearError,
  }
}