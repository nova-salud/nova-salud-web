import { useAppQuery } from '@/shared/hooks'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

export const useEmoCycleHistory = (employeeId: number) => {
  const { data, ...rest } = useAppQuery<ClinicalHistoryEmoCycleResponseDto[]>({
    queryKey: ['emo-cycle-history', employeeId],
    queryFn: () => clinicalHistoryEmoCycleService.findByEmployeeId(employeeId),
    enabled: Boolean(employeeId),
  })
  return { ...rest, cycles: data ?? [] }
}
