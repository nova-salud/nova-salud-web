import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { deliveryService } from '../services/delivery.service'
import type { InventoryDeliveryResponseDto } from '../types/inventory-delivery-response.dto'

type UseDeliveryReturn = {
  data: InventoryDeliveryResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  completeDelivery: () => Promise<void>
  cancelDelivery: (reason?: string) => Promise<void>
  isSubmitting: boolean
}

export const useDelivery = (id: number): UseDeliveryReturn => {
  const [data, setData] = useState<InventoryDeliveryResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDelivery = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await deliveryService.findById(id)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener la entrega.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener la entrega.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const completeDelivery = async (): Promise<void> => {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await deliveryService.complete(id)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo completar la entrega.')
      } else {
        setError(backendError.message ?? 'No se pudo completar la entrega.')
      }

      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const cancelDelivery = async (reason?: string): Promise<void> => {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await deliveryService.cancel(id, reason ? { reason } : undefined)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo cancelar la entrega.')
      } else {
        setError(backendError.message ?? 'No se pudo cancelar la entrega.')
      }

      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    void fetchDelivery()
  }, [id])

  return {
    data,
    isLoading,
    error,
    refetch: fetchDelivery,
    completeDelivery,
    cancelDelivery,
    isSubmitting,
  }
}