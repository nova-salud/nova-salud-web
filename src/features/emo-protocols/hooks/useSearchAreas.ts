import { SortOrder } from '@/core/types/query-params.type'
import { employeeAreaService } from '@/features/employees/services/employee-area.service'
import type { FindEmployeeAreasDto } from '@/features/employees/types/find-employee-areas.dto'
import { useAppQuery } from '@/shared/hooks'

export const useSearchAreas = () => {
  const areasQuery: FindEmployeeAreasDto = {
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }

  const result = useAppQuery({
    queryKey: ['search-areas', areasQuery],
    queryFn: () => employeeAreaService.findAll(areasQuery)
  })


  return {
    areas: result.data?.data ?? [],
    isLoading: result.isLoading
  }
}