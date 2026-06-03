import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { requirementService } from '../services/requirement.service'
import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'

export const useRequirements = (query: FindInventoryRequirementsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => requirementService.findAll({ ...query, page, pageSize }),
    [
      query.status,
      query.requestedByUserId,
      query.deliveredByUserId,
      query.sortBy,
      query.sortOrder,
    ],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
