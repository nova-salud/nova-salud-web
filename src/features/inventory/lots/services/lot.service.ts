import { ApiService } from '@/core/api/api.service'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'

class LotService extends ApiService {
  async findByDeliveryId(deliveryId: number): Promise<MedicationLotResponseDto[]> {
    return await this.get<MedicationLotResponseDto[]>(`/inventory/deliveries/${deliveryId}/lots`)
  }
}

export const lotService = new LotService()