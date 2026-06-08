import { useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dashboardService } from '../services/dashboard.service'
import type { ManagementDashboardResponse } from '../types/managment-dashboard-response'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'

export const useManagementDashboard = (filters: DateRange) => {
  const [data, setData] = useState<ManagementDashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await dashboardService.getManagementDashboard(filters)
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
  }, [filters.startDate, filters.endDate])

  return { data, isLoading, error, refetch: fetchDashboard }
}
