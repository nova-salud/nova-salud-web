import { useAppQuery } from '@/shared/hooks'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useEmoCycle = (id: number) => {
  return useAppQuery({
    queryKey: ['emo-cycle', id],
    queryFn: () => clinicalHistoryEmoCycleService.findById(id),
    enabled: Boolean(id && !Number.isNaN(id)),
  })
}
