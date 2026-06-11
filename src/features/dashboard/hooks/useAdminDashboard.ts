import { useAppQuery } from '@/shared/hooks'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { dashboardService } from '../services/dashboard.service'

export const useAdminDashboard = (filters: DateRange, eventType?: string) => {
  return useAppQuery({
    queryKey: ['admin-dashboard', filters, eventType],
    queryFn: () => dashboardService.getAdminDashboard(filters, eventType),
  })
}
