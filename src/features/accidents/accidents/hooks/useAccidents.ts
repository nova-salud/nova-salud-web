import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useUrlFilters } from '@/shared/hooks/useUrlFilters'
import type { FindAccidentsDto } from '../types/find-accidents.dto'
import type { AccidentResponseDto } from '../types'
import { accidentService } from '../services/accident.service'
import { ACCIDENT_QUERY_KEYS } from '../constants/accident-query-keys'

type ExtraFilters = Omit<FindAccidentsDto, keyof QueryParams>

export const useAccidents = () => {
  const { filters: extraFilters, setFilters } = useUrlFilters<ExtraFilters>()

  const result = usePaginatedQuery<AccidentResponseDto, FindAccidentsDto>({
    queryKey: ACCIDENT_QUERY_KEYS.list({ ...extraFilters }),
    queryFn: (filters) => accidentService.findAll({
      ...filters,
      ...extraFilters,
    }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setFilters(filters)
    result.goToPage(1)
  }

  return {
    ...result,
    filters: extraFilters,
    onChangeFilters,
  }
}
