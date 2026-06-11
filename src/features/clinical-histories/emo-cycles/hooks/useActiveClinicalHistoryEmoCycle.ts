import { useAppQuery } from '@/shared/hooks'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useActiveClinicalHistoryEmoCycle = (clinicalHistoryId: number) => {
  return useAppQuery({
    queryKey: ['emo-cycle-active', clinicalHistoryId],
    queryFn: () => clinicalHistoryEmoCycleService.findActiveByClinicalHistoryId(clinicalHistoryId),
    enabled: Boolean(clinicalHistoryId && !Number.isNaN(clinicalHistoryId)),
  })
}
