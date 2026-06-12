import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useDebounce, useUrlFilters } from '@/shared/hooks'
import type { FindEmployeesDto } from '../types/find-employees.dto'
import type { EmployeeResponseDto } from '../types'
import { employeeService } from '../services/employee.service'
import { EMPLOYEE_QUERY_KEYS } from '../constants/employee-query-keys'

type ExtraFilters = Omit<FindEmployeesDto, keyof QueryParams>

const DEFAULT_DELAY = 450

export const useEmployees = ({ isExternal = false }: { isExternal: boolean }) => {
  const { filters: extraFilters, setFilters } = useUrlFilters<ExtraFilters>()

  const debounceFullName = useDebounce(extraFilters.fullName as string | undefined, DEFAULT_DELAY)
  const debouncedDni = useDebounce(extraFilters.dni as string | undefined, DEFAULT_DELAY)
  const debouncedCompany = useDebounce(extraFilters.company as string | undefined, DEFAULT_DELAY)
  const debouncedAreaName = useDebounce(extraFilters.areaName as string | undefined, DEFAULT_DELAY)

  const result = usePaginatedQuery<EmployeeResponseDto, FindEmployeesDto>({
    queryKey: EMPLOYEE_QUERY_KEYS.list({
      ...extraFilters,
      fullName: debounceFullName,
      isExternal,
    }),
    queryFn: (filters) => employeeService.findAll({
      ...filters,
      ...extraFilters,
      fullName: debounceFullName || undefined,
      dni: debouncedDni || undefined,
      company: debouncedCompany || undefined,
      areaName: debouncedAreaName || undefined,
      isExternal,
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
