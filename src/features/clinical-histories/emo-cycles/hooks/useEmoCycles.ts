import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useUrlFilters } from '@/shared/hooks/useUrlFilters'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { FindEmoCyclesDto } from '../types/find-emo-cycles.dto'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

type ExtraFilters = Omit<FindEmoCyclesDto, keyof QueryParams>

export const useEmoCycles = () => {
  const { filters: extraFilters, setFilters } = useUrlFilters<ExtraFilters>()
  const debouncedName = useDebounce(extraFilters.employeeFullName, 400)

  const result = usePaginatedQuery<ClinicalHistoryEmoCycleResponseDto, FindEmoCyclesDto>({
    queryKey: ['emo-cycles-list', extraFilters],
    queryFn: (filters) => clinicalHistoryEmoCycleService.findAll({
      ...filters,
      ...extraFilters,
      employeeFullName: debouncedName,
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
