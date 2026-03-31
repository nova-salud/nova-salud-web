import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { lotService } from '../services/lot.service'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'

type UseMedicationLotsReturn = {
  data: MedicationLotResponseDto[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useMedicationLots = (medicationId: number): UseMedicationLotsReturn => {
  const [data, setData] = useState<MedicationLotResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLots = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await lotService.findAll({
        page: 1,
        pageSize: 50,
        sortBy: 'expirationDate',
        sortOrder: 'ASC',
        medicationId,
      })

      setData(result.data)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener los lotes del medicamento.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener los lotes del medicamento.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!Number.isNaN(medicationId)) {
      void fetchLots()
    }
  }, [medicationId])

  return {
    data,
    isLoading,
    error,
    refetch: fetchLots,
  }
}