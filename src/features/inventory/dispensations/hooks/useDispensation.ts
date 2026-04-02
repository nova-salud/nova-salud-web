import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
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

  const fetchDispensation = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.findById(id)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError
      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener la dispensación.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener la dispensación.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchDispensation()
    }
  }, [id])

  return {
    data,
    isLoading,
    error,
    refetch: fetchDispensation,
  }
}