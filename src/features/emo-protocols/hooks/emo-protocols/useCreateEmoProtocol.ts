import { useAsyncAction } from '@/core/hooks/use-async-action'
import { emoProtocolService } from '../../services/emo-protocol.service'
import type { CreateEmoProtocolDto, EmoProtocolResponseDto } from '../../types'

export const useCreateEmoProtocol = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateEmoProtocolDto],
    EmoProtocolResponseDto
  >(
    emoProtocolService.create.bind(emoProtocolService),
    {
      successMessage: 'Protocolo EMO creado correctamente.',
    },
  )

  return {
    createEmoProtocol: execute,
    isLoading,
    error,
    clearError,
  }
}