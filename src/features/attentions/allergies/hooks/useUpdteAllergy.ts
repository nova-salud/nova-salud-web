import { useAsyncAction } from '@/core/hooks/use-async-action'
import { allergyService } from '../services/allergy.service'
import type { UpdateAllergyDto, AllergyResponseDto } from '../types'

export const useUpdateAllergy = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateAllergyDto],
    AllergyResponseDto
  >(
    allergyService.update.bind(allergyService),
    { successMessage: 'Alergia actualizada correctamente.' },
  )

  return {
    updateAllergy: execute,
    isLoading,
    error,
    clearError,
  }
}