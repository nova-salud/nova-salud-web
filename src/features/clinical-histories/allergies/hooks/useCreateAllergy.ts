import { useAsyncAction } from '@/core/hooks/use-async-action'
import { allergyService } from '../services/allergy.service'
import type { CreateAllergyDto, AllergyResponseDto } from '../types'

export const useCreateAllergy = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateAllergyDto],
    AllergyResponseDto
  >(
    allergyService.create.bind(allergyService),
    { successMessage: 'Alergia registrada correctamente.' },
  )

  return {
    createAllergy: execute,
    isLoading,
    error,
    clearError,
  }
}