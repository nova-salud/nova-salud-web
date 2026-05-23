import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

export const useEmoCycleHistory = (clinicalHistoryId: number) => {
  const [cycles, setCycles] = useState<ClinicalHistoryEmoCycleResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCycles = useCallback(async (): Promise<void> => {
    if (!clinicalHistoryId) return
    try {
      setIsLoading(true)
      setError(null)
      const result = await clinicalHistoryEmoCycleService.findByClinicalHistoryId(clinicalHistoryId)
      setCycles(result)
    } catch (err) {
      const message = parseBackendError(err)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [clinicalHistoryId])

  useEffect(() => {
    void fetchCycles()
  }, [fetchCycles])

  return { cycles, isLoading, error, refetch: fetchCycles }
}
