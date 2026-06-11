import { useAppQuery } from '@/shared/hooks'
import { ALLERGY_QUERY_KEYS } from '../constants/allergy-query-keys'
import { allergyService } from '../services/allergy.service'
import type { AllergyResponseDto } from '../types/allergy-response.dto'

export const useAllergies = (clinicalHistoryId: number | null | undefined) => {
  const { data, isFetching, error, refetch } = useAppQuery<AllergyResponseDto[]>({
    queryKey: ALLERGY_QUERY_KEYS.byClinicalHistory(clinicalHistoryId ?? 0),
    queryFn: () => allergyService.findByClinicalHistory(clinicalHistoryId!),
    enabled: Boolean(clinicalHistoryId && !Number.isNaN(clinicalHistoryId)),
  })

  return {
    data: data ?? [],
    isLoading: isFetching,
    error: error?.message ?? null,
    refetch: async () => { await refetch() },
  }
}
