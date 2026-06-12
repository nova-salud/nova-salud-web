import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useUrlFilters } from '@/shared/hooks/useUrlFilters'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { attentionService, type FindAttentionsParams } from '../services/attention.service'
import { ATTENTION_QUERY_KEYS } from '../constants/attention-query-keys'
import type { AttentionResponseDto } from '../types'

type ExtraFilters = Omit<FindAttentionsParams, keyof QueryParams>

export const useAttentions = () => {
  const { filters: extraFilters, setFilters } = useUrlFilters<ExtraFilters>()
  const debouncedName = useDebounce(extraFilters.employeeFullName, 400)
  const debouncedDiagnosis = useDebounce(extraFilters.diagnosisCode, 400)

  const result = usePaginatedQuery<AttentionResponseDto, FindAttentionsParams>({
    queryKey: ATTENTION_QUERY_KEYS.list({ ...extraFilters }),
    queryFn: (filters) => attentionService.findAll({
      ...filters,
      ...extraFilters,
      employeeFullName: debouncedName,
      diagnosisCode: debouncedDiagnosis,
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
