import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { AttentionResponseDto, CreateAttentionWithDispensationDto } from '../types'
import { attentionService } from '../services/attention.service'

export const useCreateAttentionWithDispensation = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateAttentionWithDispensationDto],
    AttentionResponseDto
  >(
    attentionService.createWithDispensation.bind(attentionService),
    {
      successMessage: 'Atención registrada correctamente.',
    },
  )

  return {
    createAttentionWithDispensation: execute,
    isLoading,
    error,
    clearError,
  }
}