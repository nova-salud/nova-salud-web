import { useAppQuery } from '@/shared/hooks'
import { dashboardService } from '../services/dashboard.service'

export const useEmployeeDashboard = () => {
  return useAppQuery({
    queryKey: ['employee-dashboard'],
    queryFn: () => dashboardService.getEmployeeDashboard(),
  })
}
