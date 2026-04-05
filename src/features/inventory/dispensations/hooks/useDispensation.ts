import { useCallback, useEffect, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dispensationService } from '../services/dispensation.service'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'

type UseDispensationReturn = {
  data: DispensationResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useDispensation = (id: number): UseDispensationReturn => {
  const [data, setData] = useState<DispensationResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDispensation = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.findById(id)
      setData(result)
    } catch (error) {
      const message = parseBackendError(error)

      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchDispensation()
    }
  }, [id, fetchDispensation])

  return {
    data,
    isLoading,
    error,
    refetch: fetchDispensation,
  }
}