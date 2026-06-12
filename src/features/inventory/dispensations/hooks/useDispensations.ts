import { usePaginatedQuery, useDebounce, useUrlFilters } from '@/shared/hooks'
import { dispensationService } from '../services/dispensation.service'
import type { QueryParams } from '@/core/types/query-params.type'
import type { DispensationResponseDto, FindDispensationsDto } from '../types'
import { DISPENSATION_QUERY_KEYS } from '../constants/dispensation-query-keys'
import { keepPreviousData } from '@tanstack/react-query'

type ExtraFilters = Omit<FindDispensationsDto, keyof QueryParams>

export const useDispensations = () => {
  const { filters: extraFilters, setFilters } = useUrlFilters<ExtraFilters>()
  const debouncedEmployeeFullName = useDebounce(extraFilters.employeeFullName as string | undefined, 450)

  const result = usePaginatedQuery<DispensationResponseDto, FindDispensationsDto>({
    queryKey: DISPENSATION_QUERY_KEYS.list({ ...extraFilters, employeeFullName: debouncedEmployeeFullName }),
    queryFn: (filters) => dispensationService.findAll({
      ...filters,
      ...extraFilters,
      employeeFullName: debouncedEmployeeFullName || undefined,
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
