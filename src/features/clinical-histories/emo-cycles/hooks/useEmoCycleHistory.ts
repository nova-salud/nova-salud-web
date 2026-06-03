import { useQuery } from '@tanstack/react-query'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

export const useEmoCycleHistory = (employeeId: number) => {
  const { data, isFetching, error, refetch } = useQuery<ClinicalHistoryEmoCycleResponseDto[]>({
    queryKey: ['emo-cycle-history', employeeId],
    queryFn: () => clinicalHistoryEmoCycleService.findByEmployeeId(employeeId),
    enabled: Boolean(employeeId),
    retry: false,
  })

  return {
    cycles: data ?? [],
    isLoading: isFetching || (Boolean(employeeId) && data === undefined),
    error,
    refetch: async () => { await refetch() },
  }
}
