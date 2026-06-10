import { SortOrder } from '@/core/types/query-params.type'
import { useAppQuery } from '@/shared/hooks'
import { stockService } from '../../stocks/services/stock.service'

const STOCKS_QUERY = {
  page: 1,
  pageSize: 200,
  sortBy: 'commercialName',
  sortOrder: SortOrder.ASC,
  isActive: true,
}

export const useSearchStock = () => {
  const result = useAppQuery({
    queryKey: ['search-stocks', STOCKS_QUERY],
    queryFn: () => stockService.findAll(STOCKS_QUERY)
  })

  return {
    stocks: result.data?.data ?? [],
    isLoading: result.isLoading
  }
}