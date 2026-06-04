import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { AllergyTypeResponseDto, CreateAllergyTypeDto, FindAllergyTypesDto, UpdateAllergyTypeDto } from '../types'

class AllergyTypeService extends ApiService {
  async findAll(params: FindAllergyTypesDto): Promise<PaginatedResponse<AllergyTypeResponseDto>> {
    return await this.get<PaginatedResponse<AllergyTypeResponseDto>>('/allergy-types', { params })
  }

  async create(dto: CreateAllergyTypeDto): Promise<AllergyTypeResponseDto> {
    return await this.post<AllergyTypeResponseDto>('/allergy-types', dto)
  }

  async update(id: number, dto: UpdateAllergyTypeDto): Promise<AllergyTypeResponseDto> {
    return await this.patch<AllergyTypeResponseDto>(`/allergy-types/${id}`, dto)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/allergy-types/${id}`)
  }
}

export const allergyTypeService = new AllergyTypeService()
