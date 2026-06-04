import { ApiService } from '@/core/api/api.service'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'
import type { CreateMedicationLotDto } from '../types/create-medication-lot.dto'
import type { AdjustMedicationLotDto } from '../types/adjust-medication-lot.dto'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindMedicationLotsDto } from '../types/find-medication-lots.dto'

class LotService extends ApiService {
  async create(dto: CreateMedicationLotDto): Promise<MedicationLotResponseDto> {
    return await this.post<MedicationLotResponseDto>('/inventory/lots', dto)
  }

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

  async adjust(id: number, dto: AdjustMedicationLotDto): Promise<MedicationLotResponseDto> {
    return await this.patch<MedicationLotResponseDto>(`/inventory/lots/${id}/adjust`, dto)
  }
}

export const lotService = new LotService()