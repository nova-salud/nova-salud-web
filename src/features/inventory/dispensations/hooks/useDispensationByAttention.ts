import { useAppQuery } from '@/shared/hooks'
import { dispensationService } from '../services/dispensation.service'

export const useDispensationByAttention = (attentionId: number) => {
  return useAppQuery({
    queryKey: ['dispensation-by-attention', attentionId],
    queryFn: () => dispensationService.findByAttentionId(attentionId),
    enabled: Boolean(attentionId && !Number.isNaN(attentionId)),
  })
}
