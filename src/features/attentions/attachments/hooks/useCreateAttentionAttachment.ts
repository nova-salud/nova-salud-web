import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { AttentionAttachmentResponseDto, CreateAttentionAttachmentDto } from '../types'
import { attentionAttachmentService } from '../services/attention-attachment.service'

export const useCreateAttentionAttachment = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateAttentionAttachmentDto, File],
    AttentionAttachmentResponseDto
  >(
    attentionAttachmentService.create.bind(attentionAttachmentService),
    {
      successMessage: 'Adjunto registrado correctamente.',
    },
  )

  return {
    createAttentionAttachment: execute,
    isLoading,
    error,
    clearError,
  }
}