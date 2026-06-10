import { medicationService } from '../services/medication.service'
import type { CreateMedicationDto } from '../types/create-medication.dto'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { MedicationResponseDto } from '../types'

export const useCreateMedication = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateMedicationDto],
    MedicationResponseDto
  >(
    medicationService.create.bind(medicationService),
    {
      successMessage: 'Medicamento creado correctamente.',
    },
  )

  return {
    create: execute,
    isLoading,
    error,
    clearError,
  }
}