import { useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { requirementService } from '../services/requirement.service'
import type { ConfirmInventoryRequirementDto } from '../types/confirm-inventory-requirement.dto'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

type UseConfirmRequirementReturn = {
  confirm: (
    id: number,
    dto: ConfirmInventoryRequirementDto,
  ) => Promise<InventoryRequirementResponseDto | null>
  isLoading: boolean
  error: string | null
}

export const useConfirmRequirement = (): UseConfirmRequirementReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const confirm = async (
    id: number,
    dto: ConfirmInventoryRequirementDto,
  ): Promise<InventoryRequirementResponseDto | null> => {
    try {
      setIsLoading(true)
      setError(null)

      return await requirementService.confirm(id, dto)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo confirmar el requerimiento.')
      } else {
        setError(backendError.message ?? 'No se pudo confirmar el requerimiento.')
      }

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    confirm,
    isLoading,
    error,
  }
}