import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { CreateHealthcareCenterDto, HealthcareCenterResponseDto } from '../types'
import { healthcareCenterService } from '../services/healthcare-center.service'

export const useCreateHealthcareCenter = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateHealthcareCenterDto],
    HealthcareCenterResponseDto
  >(
    healthcareCenterService.create.bind(healthcareCenterService),
    {
      successMessage: 'Establecimiento de salud creado correctamente.',
    },
  )

  return {
    createHealthcareCenter: execute,
    isLoading,
    error,
    clearError,
  }
}