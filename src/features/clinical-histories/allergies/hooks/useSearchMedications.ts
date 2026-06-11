import { useAppQuery } from '@/shared/hooks'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { MEDICATION_QUERY_KEYS } from '@/features/inventory/medications/constants/medications-query-keys'
import { medicationService } from '@/features/inventory/medications/services/medication.service'
import type { MedicationResponseDto } from '@/features/inventory/medications/types/medication-response.dto'

const QUERY = { page: 1, pageSize: 200, sortBy: 'commercialName', isActive: true }

export const useSearchMedications = () => {
  const { data, isFetching, error } = useAppQuery<PaginatedResponse<MedicationResponseDto>>({
    queryKey: MEDICATION_QUERY_KEYS.list(QUERY),
    queryFn: () => medicationService.findAll(QUERY),
  })

  return {
    data: data?.data ?? [],
    isLoading: isFetching,
    error: error?.message ?? null,
  }
}
