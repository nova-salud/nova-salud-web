import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { allergyTypeService } from '../services/allergy-type.service'
import type { AllergyTypeResponseDto, CreateAllergyTypeDto } from '../types'

export const useCreateAllergyType = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateAllergyTypeDto],
    AllergyTypeResponseDto
  >(
    allergyTypeService.create.bind(allergyTypeService),
    { successMessage: 'Tipo de alergia creado correctamente.' },
  )

  return { createAllergyType: execute, isLoading, error, clearError }
}
