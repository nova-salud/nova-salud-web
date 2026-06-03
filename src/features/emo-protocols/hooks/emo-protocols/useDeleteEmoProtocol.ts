import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { emoProtocolService } from '../../services/emo-protocol.service'

export const useDeleteEmoProtocol = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<[number], void>(
    emoProtocolService.remove.bind(emoProtocolService),
    { successMessage: 'Protocolo EMO eliminado correctamente.' },
  )

  return {
    deleteEmoProtocol: execute,
    isLoading,
    error,
    clearError,
  }
}
