import { useAppQuery } from '@/shared/hooks'
import { ATTENTION_CONFORMITY_QUERY_KEYS } from '../constants/attention-conformity-query-keys'
import { attentionConformityService } from '../services/attention-conformity.service'
import type { AttentionConformityResponseDto } from '../types/attention-conformity.types'

export const useAttentionConformity = (attentionId: number) => {
  const { data, isFetching, error, refetch } = useAppQuery<AttentionConformityResponseDto | null>({
    queryKey: ATTENTION_CONFORMITY_QUERY_KEYS.byAttention(attentionId),
    queryFn: () => attentionConformityService.findByAttention(attentionId),
    enabled: Boolean(attentionId),
  })

  return {
    data: data ?? null,
    isLoading: isFetching,
    error: error?.message ?? null,
    refetch: async () => { await refetch() },
  }
}
