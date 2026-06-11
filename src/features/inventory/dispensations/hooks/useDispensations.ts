import { useState } from 'react'
import { usePaginatedQuery, useDebounce } from '@/shared/hooks'
import { dispensationService } from '../services/dispensation.service'
import type { QueryParams } from '@/core/types/query-params.type'
import type { DispensationResponseDto, FindDispensationsDto } from '../types'
import { DISPENSATION_QUERY_KEYS } from '../constants/dispensation-query-keys'
import { keepPreviousData } from '@tanstack/react-query'

type ExtraFilters = Omit<FindDispensationsDto, keyof QueryParams>

export const useDispensations = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedEmployeeFullName = useDebounce(extraFilters.employeeFullName, 450)

  const result = usePaginatedQuery<DispensationResponseDto, FindDispensationsDto>({
    queryKey: DISPENSATION_QUERY_KEYS.list({ ...extraFilters, employeeFullName: debouncedEmployeeFullName }),
    queryFn: (filters) => dispensationService.findAll({
      ...filters,
      ...extraFilters,
      employeeFullName: debouncedEmployeeFullName || undefined,
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
