import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import { THERAPEUTIC_CATEGORY_QUERY_KEYS } from '../constants/therapeutic-category-query-keys'
import { therapeuticCategoryService } from '../services/therapeutic-category.service'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'
import type { FindTherapeuticCategoriesDto } from '../types/find-therapeutic-categories.dto'

type ExtraFilters = Omit<FindTherapeuticCategoriesDto, keyof QueryParams>

export const useTherapeuticCategories = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedName = useDebounce(extraFilters.name, 450)

  const result = usePaginatedQuery<TherapeuticCategoryResponseDto, FindTherapeuticCategoriesDto>({
    queryKey: THERAPEUTIC_CATEGORY_QUERY_KEYS.list({ ...extraFilters, name: debouncedName }),
    queryFn: (filters) => therapeuticCategoryService.findAll({
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

  return {
    ...result,
    onChangeFilters,
  }
}
