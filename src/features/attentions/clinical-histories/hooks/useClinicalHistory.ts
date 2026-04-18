import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalHistoryService } from '../services/clinical-history.service'
import type { ClinicalHistoryFullResponseDto } from '../types'

type UseClinicalHistoryReturn = {
  data: ClinicalHistoryFullResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useClinicalHistory = (
  employeeId: number | null | undefined,
): UseClinicalHistoryReturn => {
  const [data, setData] = useState<ClinicalHistoryFullResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClinicalHistory = useCallback(async (): Promise<void> => {
    if (!employeeId) {
      setData(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await clinicalHistoryService.findFullByEmployeeId(employeeId)
      setData(result)
    } catch (error) {
      setError(parseBackendError(error))
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [employeeId])

  useEffect(() => {
    void fetchClinicalHistory()
  }, [fetchClinicalHistory])

  return {
    data,
    isLoading,
    error,
    refetch: fetchClinicalHistory,
  }
}