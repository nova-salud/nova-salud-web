import { useEffect, useState } from 'react'
import { dashboardService } from '../services/dashboard.service'
import type { SSTDashboardResponse } from '../types/sst-dashboard-response'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'

export const useSSTDashboard = (filters: DateRange, eventType?: string) => {
  const [data, setData] = useState<SSTDashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await dashboardService.getSSTDashboard(filters, eventType)
      setData(response)
    } catch (error) {
      setData(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.startDate, filters.endDate, eventType])

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  }
}
