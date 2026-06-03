import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { medicalRestService } from '../services/medical-rest.service'
import type { CreateMedicalRestDto, MedicalRestResponseDto } from '../types'

export const useCreateMedicalRest = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateMedicalRestDto, File | undefined],
    MedicalRestResponseDto
  >(
    medicalRestService.create.bind(medicalRestService),
    { successMessage: 'Descanso médico registrado correctamente.' },
  )

  return {
    createMedicalRest: execute,
    isLoading,
    error,
    clearError,
  }
}
