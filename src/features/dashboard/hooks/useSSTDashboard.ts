import { useAppQuery } from '@/shared/hooks'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { dashboardService } from '../services/dashboard.service'

export const useSSTDashboard = (filters: DateRange, eventType?: string) => {
  return useAppQuery({
    queryKey: ['sst-dashboard', filters, eventType],
    queryFn: () => dashboardService.getSSTDashboard(filters, eventType),
  })
}
