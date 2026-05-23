import { useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dashboardService } from '../services/dashboard.service'
import type { AdminDashboardResponse } from '../types/admin-dashboard-response'

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await dashboardService.getAdminDashboard()
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
  }, [])

  return { data, isLoading, error, refetch: fetchDashboard }
}
