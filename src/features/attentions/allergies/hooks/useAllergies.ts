import { useCallback, useEffect, useState } from 'react'
import type { AllergyResponseDto } from '../types'
import { allergyService } from '../services/allergy.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const useAllergies = (clinicalHistoryId: number | null | undefined) => {
  const [data, setData] = useState<AllergyResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAllergies = useCallback(async () => {
    if (!clinicalHistoryId || Number.isNaN(clinicalHistoryId)) {
      setData([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await allergyService.findByClinicalHistory(clinicalHistoryId)
      setData(result)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [clinicalHistoryId])

  useEffect(() => {
    void fetchAllergies()
  }, [fetchAllergies])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAllergies,
  }
}