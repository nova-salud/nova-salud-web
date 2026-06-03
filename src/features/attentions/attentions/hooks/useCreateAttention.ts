import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { AttentionResponseDto, CreateAttentionDto } from '../types'
import { attentionService } from '../services/attention.service'

export const useCreateAttention = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateAttentionDto],
    AttentionResponseDto
  >(
    attentionService.create.bind(attentionService),
  )

  return {
    createAttention: execute,
    isLoading,
    error,
    clearError,
  }
}