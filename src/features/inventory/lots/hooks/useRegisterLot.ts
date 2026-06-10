import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { CreateMedicationLotDto, MedicationLotResponseDto } from '../types'
import { lotService } from '../services/lot.service'

export const useRegisterLot = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateMedicationLotDto],
    MedicationLotResponseDto
  >(
    lotService.create.bind(lotService),
    {
      successMessage: 'Lote creado correctamente.',
    },
  )

  return {
    register: execute,
    isLoading,
    error,
    clearError,
  }
}