import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindInventoryMovementsDto } from '../types/find-inventory-movements.dto'
import type { InventoryMovementResponseDto } from '../types/inventory-movement-response.dto'

class MovementService extends ApiService {
  async findAll(
    query: FindInventoryMovementsDto,
  ): Promise<PaginatedResponse<InventoryMovementResponseDto>> {
    return await this.getPaginated<InventoryMovementResponseDto>('/inventory/movements', {
      params: query,
    })
  }

  async findById(id: number): Promise<InventoryMovementResponseDto> {
    return await this.get<InventoryMovementResponseDto>(`/inventory/movements/${id}`)
  }
}

export const movementService = new MovementService()