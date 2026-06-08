import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { attentionConformityService } from '../services/attention-conformity.service'
import type { CreateAttentionConformityDto } from '../types/attention-conformity.types'

export const useCreateAttentionConformity = () => {
  const { execute, isLoading, error } = useAsyncAction(
    (dto: CreateAttentionConformityDto) => attentionConformityService.create(dto),
    { successMessage: 'Conformidad registrada correctamente.' },
  )

  return { createConformity: execute, isLoading, error }
}
