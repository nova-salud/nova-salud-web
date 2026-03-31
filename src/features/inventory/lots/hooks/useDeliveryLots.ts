import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { lotService } from '../services/lot.service'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'

type UseDeliveryLotsReturn = {
  data: MedicationLotResponseDto[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useDeliveryLots = (deliveryId: number): UseDeliveryLotsReturn => {
  const [data, setData] = useState<MedicationLotResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLots = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await lotService.findByDeliveryId(deliveryId)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener los lotes de la entrega.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener los lotes de la entrega.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchLots()
  }, [deliveryId])

  return {
    data,
    isLoading,
    error,
    refetch: fetchLots,
  }
}