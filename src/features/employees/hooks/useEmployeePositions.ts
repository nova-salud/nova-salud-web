import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import { EMPLOYEE_QUERY_KEYS } from '../constants/employee-query-keys'
import { employeePositionService } from '../services/employee-position.service'
import type { FindEmployeePositionsDto, EmployeePositionResponseDto } from '../types'

type ExtraFilters = Omit<FindEmployeePositionsDto, keyof QueryParams>

export const useEmployeePositions = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debounceName = useDebounce(extraFilters.name, 450)

  const result = usePaginatedQuery<EmployeePositionResponseDto, FindEmployeePositionsDto>({
    queryKey: EMPLOYEE_QUERY_KEYS.listPositions({ ...extraFilters, name: debounceName }),
    queryFn: (filters) => employeePositionService.findAll({
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
