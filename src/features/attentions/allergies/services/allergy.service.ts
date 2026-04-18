import { ApiService } from '@/core/api/api.service'
import type { CreateAllergyDto, AllergyResponseDto, UpdateAllergyDto } from '../types'

class AllergyService extends ApiService {
  async create(dto: CreateAllergyDto): Promise<AllergyResponseDto> {
    return await this.post<AllergyResponseDto>('/attentions/allergies', dto)
  }

  async findByClinicalHistory(clinicalHistoryId: number): Promise<AllergyResponseDto[]> {
    return await this.get<AllergyResponseDto[]>(`/attentions/allergies/clinical-history/${clinicalHistoryId}`)
  }

  async update(id: number, dto: UpdateAllergyDto): Promise<AllergyResponseDto> {
    return await this.patch<AllergyResponseDto>(`/attentions/allergies/${id}`, dto)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/attentions/allergies/${id}`)
  }
}

export const allergyService = new AllergyService()