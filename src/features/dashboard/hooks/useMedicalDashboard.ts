import { useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dashboardService } from '../services/dashboard.service'
import type { MedicalDashboardResponse } from '../types/medical-dashboard-response'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'

export const useMedicalDashboard = (filters: DateRange) => {
  const [data, setData] = useState<MedicalDashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await dashboardService.getMedicalDashboard(filters)
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
