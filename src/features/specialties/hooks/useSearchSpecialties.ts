import { SortOrder } from '@/core/types/query-params.type'
import { useAppQuery } from '@/shared/hooks'
import { specialtyService } from '../services/specialty.service'

const SPECIALTY_SEARCH_QUERY = {
  page: 1,
  pageSize: 100,
  sortBy: 'name',
  sortOrder: SortOrder.ASC,
  isActive: true,
}

export const useSearchSpecialties = () => {
  const result = useAppQuery({
    queryKey: ['search-specialties', SPECIALTY_SEARCH_QUERY],
    queryFn: () => specialtyService.findAll(SPECIALTY_SEARCH_QUERY),
  })

  return {
    specialties: result.data?.data ?? [],
    isLoading: result.isLoading,
  }
}
