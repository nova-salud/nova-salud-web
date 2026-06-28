import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import { SPECIALTY_QUERY_KEYS } from '../constants/specialty-query-keys'
import { specialtyService } from '../services/specialty.service'
import type { FindSpecialtiesDto, SpecialtyResponseDto } from '../types'

type ExtraFilters = Omit<FindSpecialtiesDto, keyof QueryParams>

export const useSpecialties = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedName = useDebounce(extraFilters.name, 450)

  const result = usePaginatedQuery<SpecialtyResponseDto, FindSpecialtiesDto>({
    queryKey: SPECIALTY_QUERY_KEYS.list({ ...extraFilters, name: debouncedName }),
    queryFn: (filters) => specialtyService.findAll({
      ...filters,
      ...extraFilters,
      name: debouncedName || undefined,
      sortBy: 'name',
    }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return { ...result, onChangeFilters }
}
