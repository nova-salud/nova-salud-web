import { useAppQuery } from '@/shared/hooks'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { dashboardService } from '../services/dashboard.service'

export const useMedicalDashboard = (filters: DateRange) => {
  return useAppQuery({
    queryKey: ['medical-dashboard', filters],
    queryFn: () => dashboardService.getMedicalDashboard(filters),
  })
}
