import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { allergyTypeService } from '../services/allergy-type.service'
import type { FindAllergyTypesDto } from '../types'

export const useAllergyTypes = (query: FindAllergyTypesDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => allergyTypeService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
