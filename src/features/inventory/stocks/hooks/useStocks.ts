import { useCallback } from 'react'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { stockService } from '../services/stock.service'
import type { FindInventoryStocksDto } from '../types/find-inventory-stocks.dto'

export const useStocks = (query: FindInventoryStocksDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => stockService.findAll({ ...query, page, pageSize }),
    [
      query.commercialName,
      query.genericName,
      query.therapeuticCategoryId,
      query.isOtc,
      query.isActive,
      query.lowStock,
      query.sortBy,
      query.sortOrder,
    ],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
