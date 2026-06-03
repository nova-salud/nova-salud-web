import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { dispensationService } from '../services/dispensation.service'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'

export const useDispensationByAttention = (attentionId: number) => {
  const enabled = Boolean(attentionId && !Number.isNaN(attentionId))

  const fetcher = useCallback(
    () => dispensationService.findByAttentionId(attentionId) as Promise<DispensationResponseDto | null>,
    [attentionId],
  )

  return useQuery<DispensationResponseDto | null>(fetcher, null, enabled)
}
