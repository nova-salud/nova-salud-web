import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import { DISEASE_QUERY_KEYS } from '../constants/disease-query-keys'
import { diseaseService } from '../services/disease.service'
import type { DiseaseResponseDto, FindDiseasesDto } from '../types'

type ExtraFilters = Omit<FindDiseasesDto, keyof QueryParams>

export const useDiseases = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedName = useDebounce(extraFilters.name, 450)
  const debouncedCode = useDebounce(extraFilters.code, 450)
  const debouncedCategory = useDebounce(extraFilters.category, 450)

  const result = usePaginatedQuery<DiseaseResponseDto, FindDiseasesDto>({
    queryKey: DISEASE_QUERY_KEYS.list({
      ...extraFilters,
      name: debouncedName,
      code: debouncedCode,
      category: debouncedCategory,
    }),
    queryFn: (filters) => diseaseService.findAll({
      ...filters,
      ...extraFilters,
      name: debouncedName || undefined,
      code: debouncedCode || undefined,
      category: debouncedCategory || undefined,
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
