import { useAsyncAction } from '@/core/hooks/use-async-action'
import { accidentService } from '../services/accident.service'
import type { UpdateAccidentDto, AccidentResponseDto } from '../types'

export const useUpdateAccident = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateAccidentDto],
    AccidentResponseDto
  >(
    accidentService.update.bind(accidentService),
    {
      successMessage: 'Accidente actualizado correctamente.',
    },
  )

  return {
    updateAccident: execute,
    isLoading,
    error,
    clearError,
  }
}