import { useAsyncAction } from '@/core/hooks/use-async-action'
import { attentionAttachmentService } from '../services/attention-attachment.service'

export const useRemoveAttentionAttachment = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number],
    void
  >(
    attentionAttachmentService.remove.bind(attentionAttachmentService),
    {
      successMessage: 'Adjunto eliminado correctamente.',
    },
  )

  return {
    removeAttentionAttachment: execute,
    isLoading,
    error,
    clearError,
  }
}