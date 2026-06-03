import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { dispensationService } from '../services/dispensation.service'
import type { FindDispensationsDto } from '../types/find-dispensations.dto'

export const useDispensations = (query: FindDispensationsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => dispensationService.findAll({ ...query, page, pageSize }),
    [
      query.dispenseType,
      query.collaboratorDni,
      query.thirdPartyDni,
      query.attentionId,
      query.dispensedByUserId,
      query.sortBy,
      query.sortOrder,
    ],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
