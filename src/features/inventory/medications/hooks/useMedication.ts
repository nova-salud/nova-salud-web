import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { medicationService } from '../services/medication.service'
import type { MedicationResponseDto } from '../types/medication-response.dto'

type UseMedicationReturn = {
  data: MedicationResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useMedication = (id: number): UseMedicationReturn => {
  const [data, setData] = useState<MedicationResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMedication = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await medicationService.findById(id)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener el medicamento.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener el medicamento.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchMedication()
    }
  }, [id])

  return {
    data,
    isLoading,
    error,
    refetch: fetchMedication,
  }
}