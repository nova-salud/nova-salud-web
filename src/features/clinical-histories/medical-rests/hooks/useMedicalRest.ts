import { useAppQuery } from '@/shared/hooks'
import { medicalRestService } from '../services/medical-rest.service'

export const useMedicalRest = (id: number) => {
  const result = useAppQuery({
    queryKey: ['medical-rest', id],
    queryFn: () => medicalRestService.findById(id),
    enabled: !!id,
  })

  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error ? 'No fue posible obtener la información del descanso médico.' : null,
    refetch: result.refetch,
  }
}
