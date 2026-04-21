import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

export const useEmoCycle = (id: number) => {
  const [data, setData] = useState<ClinicalHistoryEmoCycleResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCycle = useCallback(async () => {
    if (!id || Number.isNaN(id)) {
      setData(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await clinicalHistoryEmoCycleService.findById(id)
      setData(result)
    } catch (error) {
      setData(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void fetchCycle()
  }, [fetchCycle])

  return {
    data,
    isLoading,
    error,
    refetch: fetchCycle,
  }
}