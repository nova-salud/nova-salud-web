import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { allergyTypeService } from '../services/allergy-type.service'
import type { AllergyTypeResponseDto, UpdateAllergyTypeDto } from '../types'

export const useUpdateAllergyType = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateAllergyTypeDto],
    AllergyTypeResponseDto
  >(
    allergyTypeService.update.bind(allergyTypeService),
    { successMessage: 'Tipo de alergia actualizado correctamente.' },
  )

  return { updateAllergyType: execute, isLoading, error, clearError }
}
