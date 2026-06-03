import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { therapeuticCategoryService } from '../services/therapeutic-category.service'

export const useTherapeuticCategories = () => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => therapeuticCategoryService.findAll({ page, pageSize }),
    [],
  )

  return usePaginatedQuery(fetcher, 100)
}
