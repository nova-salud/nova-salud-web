import { ApiService } from '@/core/api/api.service'
import type { MedicationResponseDto } from '../types/medication-response.dto'
import type { CreateMedicationDto } from '../types/create-medication.dto'

class MedicationService extends ApiService {
  async findById(id: number): Promise<MedicationResponseDto> {
    return await this.get<MedicationResponseDto>(`/inventory/medications/${id}`)
  }

  async create(dto: CreateMedicationDto): Promise<void> {
    await this.post('/inventory/medications', dto)
  }

  async update(id: number, dto: CreateMedicationDto): Promise<void> {
    await this.patch(`/inventory/medications/${id}`, dto)
  }
}

export const medicationService = new MedicationService()