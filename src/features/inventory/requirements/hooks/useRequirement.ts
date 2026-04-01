import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { requirementService } from '../services/requirement.service'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

type UseRequirementReturn = {
  data: InventoryRequirementResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useRequirement = (id: number): UseRequirementReturn => {
  const [data, setData] = useState<InventoryRequirementResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequirement = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await requirementService.findById(id)
      setData(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener el requerimiento.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener el requerimiento.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchRequirement()
    }
  }, [id])

  return {
    data,
    isLoading,
    error,
    refetch: fetchRequirement,
  }
}