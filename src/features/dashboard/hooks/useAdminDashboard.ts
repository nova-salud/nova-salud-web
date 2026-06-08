import { useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dashboardService } from '../services/dashboard.service'
import type { AdminDashboardResponse } from '../types/admin-dashboard-response'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'

export const useAdminDashboard = (filters: DateRange, eventType?: string) => {
  const [data, setData] = useState<AdminDashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await dashboardService.getAdminDashboard(filters, eventType)
      setData(response)
    } catch (err) {
      setData(null)
      setError(parseBackendError(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.startDate, filters.endDate, eventType])

  return { data, isLoading, error, refetch: fetchDashboard }
}
