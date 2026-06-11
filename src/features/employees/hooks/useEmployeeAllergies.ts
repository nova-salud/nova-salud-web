import { useAppQuery } from '@/shared/hooks'
import { EMPLOYEE_QUERY_KEYS } from '../constants/employee-query-keys'
import { employeeService } from '../services/employee.service'

export const useEmployeeAllergies = (id: number) => {
  const { data, ...rest } = useAppQuery({
    queryKey: [...EMPLOYEE_QUERY_KEYS.detail(id), 'allergies'],
    queryFn: () => employeeService.findAllergies(id),
    enabled: !!id,
  })
  return { ...rest, data: data ?? [] }
}
