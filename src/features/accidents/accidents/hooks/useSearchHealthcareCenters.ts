import { HEALTHCARE_CENTER_QUERY_KEYS } from '@/features/healthcare-centers/constants/healthcare-centers-query-keys'
import { healthcareCenterService } from '@/features/healthcare-centers/services/healthcare-center.service'
import { useAppQuery } from '@/shared/hooks'

const SEARCH_QUERY = { page: 1, pageSize: 100, isActive: true }

export const useSearchHealthcareCenters = () => {
  const result = useAppQuery({
    queryKey: HEALTHCARE_CENTER_QUERY_KEYS.list(SEARCH_QUERY),
    queryFn: () => healthcareCenterService.findAll(SEARCH_QUERY),
  })

  return {
    healthcareCenters: result.data?.data ?? [],
    isLoading: result.isLoading,
  }
}
