import { useAsyncAction } from '@/core/hooks/use-async-action'
import { diseaseService } from '../services/disease.service'
import type { DiseaseResponseDto, UpdateDiseaseDto } from '../types'

export const useUpdateDisease = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateDiseaseDto],
    DiseaseResponseDto
  >(
    diseaseService.update.bind(diseaseService),
    {
      successMessage: 'Enfermedad actualizada correctamente.',
    },
  )

  return {
    updateDisease: execute,
    isLoading,
    error,
    clearError,
  }
}