import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { MedicationLotResponseDto } from '@/features/inventory/lots/types/medication-lot-response.dto'
import type { FindInventoryDeliveriesDto } from '../types/find-inventory-deliveries.dto'
import type { InventoryDeliveryResponseDto } from '../types/inventory-delivery-response.dto'
import type { RegisterMedicationLotFromDeliveryDto } from '../types/register-medication-lot-from-delivery.dto'

class DeliveryService extends ApiService {
  async findAll(
    query: FindInventoryDeliveriesDto,
  ): Promise<PaginatedResponse<InventoryDeliveryResponseDto>> {
    return await this.getPaginated<InventoryDeliveryResponseDto>('/inventory/deliveries', {
      params: query,
    })
  }

  async findById(id: number): Promise<InventoryDeliveryResponseDto> {
    return await this.get<InventoryDeliveryResponseDto>(`/inventory/deliveries/${id}`)
  }

  async findLotsByDeliveryId(id: number): Promise<MedicationLotResponseDto[]> {
    return await this.get<MedicationLotResponseDto[]>(`/inventory/deliveries/${id}/lots`)
  }

  async registerLot(
    id: number,
    payload: RegisterMedicationLotFromDeliveryDto,
  ): Promise<MedicationLotResponseDto> {
    return await this.post<MedicationLotResponseDto, RegisterMedicationLotFromDeliveryDto>(
      `/inventory/deliveries/${id}/lots`,
      payload,
    )
  }

  async complete(id: number): Promise<InventoryDeliveryResponseDto> {
    return await this.post<InventoryDeliveryResponseDto>(`/inventory/deliveries/${id}/complete`)
  }

  async cancel(
    id: number,
    payload?: { reason?: string },
  ): Promise<InventoryDeliveryResponseDto> {
    return await this.post<InventoryDeliveryResponseDto, { reason?: string }>(
      `/inventory/deliveries/${id}/cancel`,
      payload,
    )
  }
}

export const deliveryService = new DeliveryService()