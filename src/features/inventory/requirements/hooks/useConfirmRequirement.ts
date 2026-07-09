import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { requirementService } from '../services/requirement.service'
import type { ConfirmInventoryRequirementDto } from '../types/confirm-inventory-requirement.dto'

export const useConfirmRequirement = () => {
  const { execute: confirm, isLoading, error, clearError } = useAsyncAction(
    (id: number, dto: ConfirmInventoryRequirementDto) =>
      requirementService.confirm(id, dto),
    { successMessage: 'Recepción confirmada correctamente.' },
  )
  return { confirm, isLoading, error, clearError }
}
