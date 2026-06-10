import { healthcareCenterService } from '../services/healthcare-center.service'
import { useAppQuery } from '@/shared/hooks'
import { HEALTHCARE_CENTER_QUERY_KEYS } from '../constants/healthcare-centers-query-keys'

export const useHealthcareCenter = (id: number) => {
  return useAppQuery({
    queryKey: HEALTHCARE_CENTER_QUERY_KEYS.detail(id),
    queryFn: () => healthcareCenterService.findById(id),
    enabled: !!id
  })
}
