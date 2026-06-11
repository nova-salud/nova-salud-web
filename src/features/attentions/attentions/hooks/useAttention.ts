import { useAppQuery } from '@/shared/hooks'
import { attentionService } from '../services/attention.service'
import { ATTENTION_QUERY_KEYS } from '../constants/attention-query-keys'

export const useAttention = (id: number) => {
  return useAppQuery({
    queryKey: ATTENTION_QUERY_KEYS.detail(id),
    queryFn: () => attentionService.findById(id),
    enabled: Boolean(id && !Number.isNaN(id)),
  })
}
