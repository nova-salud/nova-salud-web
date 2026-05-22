import { useCallback, useEffect, useState } from 'react'
import type { NotificationResponseDto } from '../types/notification-response.dto'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { notificationService } from '../services/notification.service'

export const useNotifications = () => {
  const [data, setData] = useState<NotificationResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await notificationService.findAll()
      setData(response)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchNotifications()
  }, [fetchNotifications])

  return {
    data,
    isLoading,
    error,
    refetch: fetchNotifications,
  }
}