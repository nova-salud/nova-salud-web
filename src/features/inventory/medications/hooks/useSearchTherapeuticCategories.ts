import { SortOrder } from '@/core/types/query-params.type'
import { useAppQuery } from '@/shared/hooks'
import { therapeuticCategoryService } from '../../therapeutic-categories/services/therapeutic-category.service'

const THERAPEUTIC_CATEGORY_QUERY = {
  page: 1,
  pageSize: 200,
  sortBy: 'name',
  sortOrder: SortOrder.ASC,
  isActive: true,
}


export const useSearchTherapeuticCategories = () => {
  const result = useAppQuery({
    queryKey: ['search-therapeutic-categories', THERAPEUTIC_CATEGORY_QUERY],
    queryFn: () => therapeuticCategoryService.findAll(THERAPEUTIC_CATEGORY_QUERY)
  })

  return {
    therapeuticCategories: result.data?.data ?? [],
    isLoading: result.isLoading
  }
}