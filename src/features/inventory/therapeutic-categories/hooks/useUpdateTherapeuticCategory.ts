import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { therapeuticCategoryService } from '../services/therapeutic-category.service'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'
import type { UpdateTherapeuticCategoryDto } from '../types/update-therapeutic-category.dto'

export const useUpdateTherapeuticCategory = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateTherapeuticCategoryDto],
    TherapeuticCategoryResponseDto
  >(
    therapeuticCategoryService.update.bind(therapeuticCategoryService),
    { successMessage: 'Categoría de medicamento actualizada correctamente.' },
  )

  return { updateTherapeuticCategory: execute, isLoading, error, clearError }
}
