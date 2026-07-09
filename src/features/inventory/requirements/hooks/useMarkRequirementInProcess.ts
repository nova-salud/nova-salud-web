import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { requirementService } from '../services/requirement.service'

export const useMarkRequirementInProcess = () => {
  const { execute: markInProcess, isLoading, error, clearError } = useAsyncAction(
    (id: number) => requirementService.markInProcess(id),
    { successMessage: 'Requerimiento marcado en proceso correctamente.' },
  )
  return { markInProcess, isLoading, error, clearError }
}
