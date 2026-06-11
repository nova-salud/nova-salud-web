import { keepPreviousData } from '@tanstack/react-query'
import { usePaginatedQuery } from '@/shared/hooks'
import { attentionService } from '../services/attention.service'
import type { AttentionResponseDto } from '../types'
import type { FindAttentionsParams } from '../services/attention.service'
import { ATTENTION_QUERY_KEYS } from '../constants/attention-query-keys'

export const useAttentionsByClinicalHistory = (clinicalHistoryId: number) => {
  const filters: FindAttentionsParams = { clinicalHistoryId, sortBy: 'id', sortOrder: 'DESC' }

  return usePaginatedQuery<AttentionResponseDto, FindAttentionsParams>({
    queryKey: ATTENTION_QUERY_KEYS.list(filters),
    queryFn: (params) => attentionService.findAll({ ...params, ...filters }),
    placeholderData: keepPreviousData,
  })
}
