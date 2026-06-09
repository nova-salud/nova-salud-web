import { SortOrder } from '@/core/types/query-params.type'
import { employeePositionService } from '@/features/employees/services/employee-position.service'
import type { FindEmployeePositionsDto } from '@/features/employees/types/find-employee-positions.dto'
import { useAppQuery } from '@/shared/hooks'

export const useSearchEmployeePositions = () => {
  const employeePositionsQuery: FindEmployeePositionsDto = {
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }

  const result = useAppQuery({
    queryKey: ['search-employee-positions', employeePositionsQuery],
    queryFn: () => employeePositionService.findAll(employeePositionsQuery)
  })


  return {
    positions: result.data?.data ?? [],
    isLoading: result.isLoading
  }
}