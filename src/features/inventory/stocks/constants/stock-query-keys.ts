import type { FindInventoryStocksDto } from '../types/find-inventory-stocks.dto'

export const STOCK_QUERY_KEYS = {
  all: ['inventory-stocks'] as const,
  list: (filters: FindInventoryStocksDto) => [...STOCK_QUERY_KEYS.all, filters] as const,
}
