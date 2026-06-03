import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { accidentService } from '../services/accident.service'
import type { CreateAccidentDto, AccidentResponseDto } from '../types'

export const useCreateAccident = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateAccidentDto],
    AccidentResponseDto
  >(
    accidentService.create.bind(accidentService),
    {
      successMessage: 'Accidente registrado correctamente.',
    },
  )

  return {
    createAccident: execute,
    isLoading,
    error,
    clearError,
  }
}