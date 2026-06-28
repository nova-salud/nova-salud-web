import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { specialtyService } from '../services/specialty.service'

export const useDeleteSpecialty = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<[number], void>(
    specialtyService.remove.bind(specialtyService),
    { successMessage: 'Especialidad eliminada correctamente.' },
  )

  return { deleteSpecialty: execute, isLoading, error, clearError }
}
