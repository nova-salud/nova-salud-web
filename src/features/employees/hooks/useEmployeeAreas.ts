import { keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import type { QueryParams } from '@/core/types/query-params.type'
import { useDebounce } from '@/shared/hooks'
import type { FindEmployeeAreasDto } from '../types/find-employee-areas.dto'
import type { EmployeeAreaResponseDto } from '../types'
import { EMPLOYEE_QUERY_KEYS } from '../constants/employee-query-keys'
import { employeeAreaService } from '../services/employee-area.service'

type ExtraFilters = Omit<FindEmployeeAreasDto, keyof QueryParams>

export const useEmployeeAreas = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debounceName = useDebounce(extraFilters.name, 450)

  const result = usePaginatedQuery<EmployeeAreaResponseDto, FindEmployeeAreasDto>({
    queryKey: EMPLOYEE_QUERY_KEYS.listAreas({ ...extraFilters, name: debounceName }),
    queryFn: (filters) => employeeAreaService.findAll({
      ...filters,
      ...extraFilters,
      name: debounceName || undefined,
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
