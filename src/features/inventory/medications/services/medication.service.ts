import { ApiService } from '@/core/api/api.service'
import type { MedicationResponseDto } from '../types/medication-response.dto'

class MedicationService extends ApiService {
  async findById(id: number): Promise<MedicationResponseDto> {
    return await this.get<MedicationResponseDto>(`/inventory/medications/${id}`)
  }
}

export const medicationService = new MedicationService()