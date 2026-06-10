import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { medicationService } from '../services/medication.service'
import type { CreateMedicationDto } from '../types/create-medication.dto'
import type { MedicationResponseDto } from '../types/medication-response.dto'

export const useUpdateMedication = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, CreateMedicationDto],
    MedicationResponseDto
  >(
    medicationService.update.bind(medicationService),
    {
      successMessage: 'Medicamento actualizado correctamente.',
    },
  )

  return {
    update: execute,
    isLoading,
    error,
    clearError,
  }
}
