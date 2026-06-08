import { useQuery } from '@tanstack/react-query'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dispensationService } from '../services/dispensation.service'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'

export const useDispensationByAttention = (attentionId: number) => {
  const enabled = Boolean(attentionId && !Number.isNaN(attentionId))

  const { data, isFetching, error } = useQuery<DispensationResponseDto | null>({
    queryKey: ['dispensation-by-attention', attentionId],
    queryFn: () => dispensationService.findByAttentionId(attentionId),
    enabled,
    retry: false,
  })

  return {
    data: data ?? null,
    isLoading: isFetching,
    error: error ? parseBackendError(error) : null,
  }
}
