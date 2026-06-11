import { useAppQuery } from '@/shared/hooks'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { dashboardService } from '../services/dashboard.service'

export const useManagementDashboard = (filters: DateRange) => {
  return useAppQuery({
    queryKey: ['management-dashboard', filters],
    queryFn: () => dashboardService.getManagementDashboard(filters),
  })
}
