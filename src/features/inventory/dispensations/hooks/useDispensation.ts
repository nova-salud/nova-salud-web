import { useAppQuery } from '@/shared/hooks'
import { dispensationService } from '../services/dispensation.service'

export const useDispensation = (id: number) => {
  return useAppQuery({
    queryKey: ['dispensation', id],
    queryFn: () => dispensationService.findById(id),
    enabled: !Number.isNaN(id),
  })
}
