import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { healthcareCenterService } from '../services/healthcare-center.service'
import type { HealthcareCenterResponseDto } from '../types'

type UseHealthcareCenterReturn = {
  data: HealthcareCenterResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useHealthcareCenter = (id: number): UseHealthcareCenterReturn => {
  const [data, setData] = useState<HealthcareCenterResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthcareCenter = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await healthcareCenterService.findById(id)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener el establecimiento.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener el establecimiento.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchHealthcareCenter()
    }
  }, [id])

  return {
    data,
    isLoading,
    error,
    refetch: fetchHealthcareCenter,
  }
}
