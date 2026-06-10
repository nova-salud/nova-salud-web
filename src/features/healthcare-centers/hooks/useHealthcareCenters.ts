import { useState } from 'react'
import type { QueryParams } from '@/core/types/query-params.type'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { FindHealthcareCentersDto, HealthcareCenterResponseDto } from '../types'
import { HEALTHCARE_CENTER_QUERY_KEYS } from '../constants/healthcare-centers-query-keys'
import { healthcareCenterService } from '../services/healthcare-center.service'

type ExtraFilters = Omit<FindHealthcareCentersDto, keyof QueryParams>

export const useHealthcareCenters = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedName = useDebounce(extraFilters.name, 450)

  const result = usePaginatedQuery<HealthcareCenterResponseDto, FindHealthcareCentersDto>({
    queryKey: HEALTHCARE_CENTER_QUERY_KEYS.list({ ...extraFilters, name: debouncedName }),
    queryFn: (filters) => healthcareCenterService.findAll({
      ...filters,
      ...extraFilters,
      name: debouncedName || undefined,
    }),
    placeholderData: keepPreviousData
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return {
    ...result,
    onChangeFilters,
  }
}
