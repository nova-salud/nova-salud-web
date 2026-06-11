import { useAppQuery } from '@/shared/hooks'
import type { InventoryStockResponseDto } from '../types/inventory-stock-response.dto'
import { stockService } from '../services/stock.service'

export const useRequestableStocks = () => {
  const { data, ...rest } = useAppQuery<InventoryStockResponseDto[]>({
    queryKey: ['inventory-stocks-requestable'],
    queryFn: () => stockService.findRequestable(),
  })
  return { ...rest, data: data ?? [] }
}
