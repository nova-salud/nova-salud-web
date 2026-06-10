import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { AdjustMedicationLotDto, MedicationLotResponseDto } from '../types'
import { lotService } from '../services/lot.service'

export const useAdjustLot = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, AdjustMedicationLotDto],
    MedicationLotResponseDto
  >(
    lotService.adjust.bind(lotService),
    {
      successMessage: 'Lote ajustado correctamente.',
    },
  )

  return {
    adjust: execute,
    isLoading,
    error,
    clearError,
  }
}