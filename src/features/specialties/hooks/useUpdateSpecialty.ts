import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { specialtyService } from '../services/specialty.service'
import type { SpecialtyResponseDto, UpdateSpecialtyDto } from '../types'

export const useUpdateSpecialty = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateSpecialtyDto],
    SpecialtyResponseDto
  >(
    specialtyService.update.bind(specialtyService),
    { successMessage: 'Especialidad actualizada correctamente.' },
  )

  return { updateSpecialty: execute, isLoading, error, clearError }
}
