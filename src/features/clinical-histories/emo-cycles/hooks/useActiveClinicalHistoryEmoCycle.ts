import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

export const useActiveClinicalHistoryEmoCycle = (clinicalHistoryId: number) => {
  const [data, setData] = useState<ClinicalHistoryEmoCycleResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchActiveCycle = useCallback(async () => {
    if (!clinicalHistoryId || Number.isNaN(clinicalHistoryId)) {
      setData(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await clinicalHistoryEmoCycleService.findActiveByClinicalHistoryId(clinicalHistoryId)
      setData(result)
    } catch (error) {
      setData(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [clinicalHistoryId])

  useEffect(() => {
    void fetchActiveCycle()
  }, [fetchActiveCycle])

  return {
    data,
    isLoading,
    error,
    refetch: fetchActiveCycle,
  }
}