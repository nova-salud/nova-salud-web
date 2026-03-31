import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindInventoryDeliveriesDto } from '../types/find-inventory-deliveries.dto'
import type { InventoryDeliveryResponseDto } from '../types/inventory-delivery-response.dto'

class DeliveryService extends ApiService {
  async findAll(
    query: FindInventoryDeliveriesDto,
  ): Promise<PaginatedResponse<InventoryDeliveryResponseDto>> {
    return await this.getPaginated<InventoryDeliveryResponseDto>('/inventory/deliveries', {
      params: query,
    })
  }
}

export const deliveryService = new DeliveryService()