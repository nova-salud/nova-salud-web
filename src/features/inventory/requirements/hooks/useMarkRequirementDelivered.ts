import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { requirementService } from '../services/requirement.service'

export const useMarkRequirementDelivered = () => {
  const { execute: markDelivered, isLoading, error, clearError } = useAsyncAction(
    (id: number, file: File, deliveryNote?: string) =>
      requirementService.markDelivered(id, file, deliveryNote),
  )
  return { markDelivered, isLoading, error, clearError }
}
