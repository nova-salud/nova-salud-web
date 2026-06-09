import { useAppQuery } from '@/shared/hooks'
import { EMPLOYEE_QUERY_KEYS } from '../constants/employee-query-keys'
import { employeeService } from '../services/employee.service'

export const useEmployee = (id: number) => {
  return useAppQuery({
    queryKey: EMPLOYEE_QUERY_KEYS.detail(id),
    queryFn: () => employeeService.findById(id),
    enabled: !!id,
  })
}