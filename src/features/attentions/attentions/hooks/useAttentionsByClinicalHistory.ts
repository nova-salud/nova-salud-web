import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { attentionService } from '../services/attention.service'

export const useAttentionsByClinicalHistory = (clinicalHistoryId: number) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      attentionService.findAll({ clinicalHistoryId, page, pageSize, sortBy: 'id', sortOrder: 'DESC' }),
    [clinicalHistoryId],
  )

  return usePaginatedQuery(fetcher)
}
