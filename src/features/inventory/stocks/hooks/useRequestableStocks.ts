import { useQuery } from '@tanstack/react-query'
import { stockService } from '../services/stock.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import type { InventoryStockResponseDto } from '../types/inventory-stock-response.dto'

export const useRequestableStocks = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['inventory-stocks-requestable'],
    queryFn: () => stockService.findRequestable(),
    retry: false,
  })

  return {
    data: data ?? ([] as InventoryStockResponseDto[]),
    isLoading: isFetching,
    error: error ? parseBackendError(error) : null,
    refetch: async () => { await refetch() },
  }
}
