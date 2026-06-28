import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { specialtyService } from '../services/specialty.service'
import type { CreateSpecialtyDto, SpecialtyResponseDto } from '../types'

export const useCreateSpecialty = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateSpecialtyDto],
    SpecialtyResponseDto
  >(
    specialtyService.create.bind(specialtyService),
    { successMessage: 'Especialidad creada correctamente.' },
  )

  return { createSpecialty: execute, isLoading, error, clearError }
}
