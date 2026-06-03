import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { medicalRestService } from '../services/medical-rest.service'

export const useDeleteMedicalRest = () => {
  const { execute, isLoading, error } = useAsyncAction<[number], void>(
    medicalRestService.remove.bind(medicalRestService),
    { successMessage: 'Descanso médico eliminado correctamente.' },
  )

  return {
    deleteMedicalRest: execute,
    isLoading,
    error,
  }
}
