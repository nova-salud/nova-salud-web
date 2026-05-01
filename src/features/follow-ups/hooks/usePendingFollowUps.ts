import { useCallback, useEffect, useState } from 'react'
import { followUpService } from '../services/follow-up.service'
import type { FollowUpResponseDto } from '../types/follow-up-response.dto'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const usePendingFollowUps = (employeeId: number = 0) => {
  const [data, setData] = useState<FollowUpResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFollowUps = useCallback(async () => {
    if (!employeeId || Number.isNaN(employeeId)) {
      setError('ID de historia clínica inválido')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result =
        await followUpService.findPendingByClinicalHistory(employeeId)

      setData(result)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [employeeId])

  useEffect(() => {
    void fetchFollowUps()
  }, [fetchFollowUps])

  return {
    data,
    isLoading,
    error,
    refetch: fetchFollowUps,
  }
}