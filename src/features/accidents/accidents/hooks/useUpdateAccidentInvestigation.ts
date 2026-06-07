import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { accidentInvestigationService, type UpdateAccidentInvestigationDto } from '../services/accident-investigation.service'
import type { AccidentInvestigationResponseDto } from '../types'

export const useUpdateAccidentInvestigation = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateAccidentInvestigationDto],
    AccidentInvestigationResponseDto
  >(
    accidentInvestigationService.update.bind(accidentInvestigationService),
    { successMessage: 'Investigación actualizada correctamente.' },
  )

  return {
    updateInvestigation: execute,
    isLoading,
    error,
    clearError,
  }
}
