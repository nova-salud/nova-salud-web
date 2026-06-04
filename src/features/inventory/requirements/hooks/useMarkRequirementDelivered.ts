import { useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { requirementService } from '../services/requirement.service'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

type UseMarkRequirementDeliveredReturn = {
  markDelivered: (
    id: number,
    file: File,
    deliveryNote?: string,
  ) => Promise<InventoryRequirementResponseDto | null>
  isLoading: boolean
  error: string | null
}

export const useMarkRequirementDelivered = (): UseMarkRequirementDeliveredReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const markDelivered = async (
    id: number,
    file: File,
    deliveryNote?: string,
  ): Promise<InventoryRequirementResponseDto | null> => {
    try {
      setIsLoading(true)
      setError(null)

      return await requirementService.markDelivered(id, file, deliveryNote)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo marcar el requerimiento como entregado.')
      } else {
        setError(backendError.message ?? 'No se pudo marcar el requerimiento como entregado.')
      }

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    markDelivered,
    isLoading,
    error,
  }
}
