import { useAsyncAction } from '@/core/hooks/use-async-action'
import { healthcareCenterService } from '../services/healthcare-center.service'
import type { UpdateHealthcareCenterDto, HealthcareCenterResponseDto } from '../types'

export const useUpdateHealthcareCenter = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateHealthcareCenterDto],
    HealthcareCenterResponseDto
  >(
    healthcareCenterService.update.bind(healthcareCenterService),
    {
      successMessage: 'Establecimiento de salud actualizado correctamente.',
    },
  )

  return {
    updateHealthcareCenter: execute,
    isLoading,
    error,
    clearError,
  }
}