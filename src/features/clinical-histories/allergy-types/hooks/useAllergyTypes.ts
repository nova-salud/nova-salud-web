import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import { ALLERGY_TYPE_QUERY_KEYS } from '../constants/allergy-type-query-keys'
import { allergyTypeService } from '../services/allergy-type.service'
import type { AllergyTypeResponseDto, FindAllergyTypesDto } from '../types'

type ExtraFilters = Omit<FindAllergyTypesDto, keyof QueryParams>

export const useAllergyTypes = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedSearch = useDebounce(extraFilters.search, 450)

  const result = usePaginatedQuery<AllergyTypeResponseDto, FindAllergyTypesDto>({
    queryKey: ALLERGY_TYPE_QUERY_KEYS.list({ ...extraFilters, search: debouncedSearch }),
    queryFn: (filters) => allergyTypeService.findAll({
      ...filters,
      ...extraFilters,
      search: debouncedSearch || undefined,
      sortBy: 'name',
    }),
    placeholderData: keepPreviousData,
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
