import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useDebounce } from '@/shared/hooks'
import type { FindEmployeesDto } from '../types/find-employees.dto'
import type { EmployeeResponseDto } from '../types'
import { employeeService } from '../services/employee.service'
import { EMPLOYEE_QUERY_KEYS } from '../constants/employee-query-keys'

type ExtraFilters = Omit<FindEmployeesDto, keyof QueryParams>

const DEFAULT_DELAY = 450

export const useEmployees = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debounceFullName = useDebounce(extraFilters.fullName, DEFAULT_DELAY)
  const debouncedDni = useDebounce(extraFilters.dni, DEFAULT_DELAY)
  const debouncedCompany = useDebounce(extraFilters.company, DEFAULT_DELAY)

  const result = usePaginatedQuery<EmployeeResponseDto, FindEmployeesDto>({
    queryKey: EMPLOYEE_QUERY_KEYS.list({ ...extraFilters, fullName: debounceFullName }),
    queryFn: (filters) => employeeService.findAll({
      ...filters,
      ...extraFilters,
      fullName: debounceFullName || undefined,
      dni: debouncedDni || undefined,
      company: debouncedCompany || undefined,
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

