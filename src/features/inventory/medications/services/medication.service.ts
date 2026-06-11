import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { CreateMedicationDto } from '../types/create-medication.dto'
import type { FindMedicationsDto } from '../types/find-medications.dto'
import type { MedicationResponseDto } from '../types/medication-response.dto'

class MedicationService extends ApiService {
  async findAll(query: FindMedicationsDto): Promise<PaginatedResponse<MedicationResponseDto>> {
    return await this.getPaginated<MedicationResponseDto>('/inventory/medications', { params: query })
  }

  async findById(id: number): Promise<MedicationResponseDto> {
    return await this.get<MedicationResponseDto>(`/inventory/medications/${id}`)
  }

  async create(dto: CreateMedicationDto): Promise<MedicationResponseDto> {
    return await this.post<MedicationResponseDto>('/inventory/medications', dto)
  }

  async update(id: number, dto: CreateMedicationDto): Promise<MedicationResponseDto> {
    return await this.patch<MedicationResponseDto>(`/inventory/medications/${id}`, dto)
  }
}

export const medicationService = new MedicationService()