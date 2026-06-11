import { useAppQuery } from '@/shared/hooks'
import { followUpService } from '../services/follow-up.service'

export const usePendingFollowUps = (employeeId = 0) => {
  const { data, ...rest } = useAppQuery({
    queryKey: ['pending-follow-ups', employeeId],
    queryFn: () => followUpService.findPendingByClinicalHistory(employeeId),
    enabled: Boolean(employeeId && !Number.isNaN(employeeId)),
  })
  return { ...rest, data: data ?? [] }
}
