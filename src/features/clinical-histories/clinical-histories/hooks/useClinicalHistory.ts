import { useAppQuery } from '@/shared/hooks'
import { CLINICAL_HISTORY_QUERY_KEYS } from '../constants/clinical-history-query-keys'
import { clinicalHistoryService } from '../services/clinical-history.service'

export const useClinicalHistory = (employeeId: number) => {
  return useAppQuery({
    queryKey: CLINICAL_HISTORY_QUERY_KEYS.detail(employeeId),
    queryFn: () => clinicalHistoryService.findFullByEmployeeId(employeeId),
    enabled: !!employeeId,
  })
}
