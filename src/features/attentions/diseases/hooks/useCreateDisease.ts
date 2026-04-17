import { useAsyncAction } from '@/core/hooks/use-async-action'
import { diseaseService } from '../services/disease.service'
import type { CreateDiseaseDto, DiseaseResponseDto } from '../types'

export const useCreateDisease = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateDiseaseDto],
    DiseaseResponseDto
  >(
    diseaseService.create.bind(diseaseService),
    {
      successMessage: 'Enfermedad creada correctamente.',
    },
  )

  return {
    createDisease: execute,
    isLoading,
    error,
    clearError,
  }
}