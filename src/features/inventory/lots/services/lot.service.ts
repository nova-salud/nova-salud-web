import { ApiService } from '@/core/api/api.service'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindMedicationLotsDto } from '../types/find-medication-lots.dto'

class LotService extends ApiService {
  async findAll(
    query: FindMedicationLotsDto,
  ): Promise<PaginatedResponse<MedicationLotResponseDto>> {
    return await this.getPaginated<MedicationLotResponseDto>('/inventory/lots', {
      params: query,
    })
  }

  async findById(id: number): Promise<MedicationLotResponseDto> {
    return await this.get<MedicationLotResponseDto>(`/inventory/lots/${id}`)
  }

  async findByDeliveryId(deliveryId: number): Promise<MedicationLotResponseDto[]> {
    return await this.get<MedicationLotResponseDto[]>(`/inventory/deliveries/${deliveryId}/lots`)
  }
}

export const lotService = new LotService()