import { medicationService } from '../services/medication.service'
import { useAppQuery } from '@/shared/hooks'
import { MEDICATION_QUERY_KEYS } from '../constants/medications-query-keys'


export const useMedication = (id: number) => {
  return useAppQuery({ 
    queryKey: MEDICATION_QUERY_KEYS.detail(id),
    queryFn: () => medicationService.findById(id),
    enabled: !!id,
  })
}