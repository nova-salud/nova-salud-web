import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { followUpService } from '../services/follow-up.service'

export const usePendingFollowUps = (employeeId = 0) => {
  const enabled = Boolean(employeeId && !Number.isNaN(employeeId))

  const fetcher = useCallback(
    () => followUpService.findPendingByClinicalHistory(employeeId),
    [employeeId],
  )

  return useQuery(fetcher, [], enabled)
}
