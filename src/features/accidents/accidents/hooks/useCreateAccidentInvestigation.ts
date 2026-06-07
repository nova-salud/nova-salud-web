import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { accidentInvestigationService, type CreateAccidentInvestigationDto } from '../services/accident-investigation.service'
import type { AccidentInvestigationResponseDto } from '../types'

export const useCreateAccidentInvestigation = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, CreateAccidentInvestigationDto],
    AccidentInvestigationResponseDto
  >(
    accidentInvestigationService.create.bind(accidentInvestigationService),
    { successMessage: 'Investigación registrada correctamente.' },
  )

  return {
    createInvestigation: execute,
    isLoading,
    error,
    clearError,
  }
}
