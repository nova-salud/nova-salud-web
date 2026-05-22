import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import type { FindAlertsDto } from '../types/find-alerts.dto'
import type { AlertResponseDto } from '../types/alert-response.dto'
import { alertService } from '../services/alert.service'

export const useAlerts = (query?: FindAlertsDto) => {
  const [data, setData] = useState<AlertResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await alertService.findAll(query)
      setData(response.data)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchAlerts()
  }, [fetchAlerts])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAlerts,
  }
}