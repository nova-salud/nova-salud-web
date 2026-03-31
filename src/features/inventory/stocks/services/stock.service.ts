import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindInventoryStocksDto } from '../types/find-inventory-stocks.dto'
import type { InventoryStockResponseDto } from '../types/inventory-stock-response.dto'

class StockService extends ApiService {
  async findAll(query: FindInventoryStocksDto): Promise<PaginatedResponse<InventoryStockResponseDto>> {
    return await this.getPaginated<InventoryStockResponseDto>('/inventory/stocks', {
      params: query,
    })
  }
}

export const stockService = new StockService()