import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { therapeuticCategoryService } from '../services/therapeutic-category.service'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'
import type { CreateTherapeuticCategoryDto } from '../types/create-therapeutic-category.dto'

export const useCreateTherapeuticCategory = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateTherapeuticCategoryDto],
    TherapeuticCategoryResponseDto
  >(
    therapeuticCategoryService.create.bind(therapeuticCategoryService),
    { successMessage: 'Categoría de medicamento creada correctamente.' },
  )

  return { createTherapeuticCategory: execute, isLoading, error, clearError }
}
