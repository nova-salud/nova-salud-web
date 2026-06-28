import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { CreateSpecialtyDto, FindSpecialtiesDto, SpecialtyResponseDto, UpdateSpecialtyDto } from '../types'

class SpecialtyService extends ApiService {
  async findAll(params?: FindSpecialtiesDto): Promise<PaginatedResponse<SpecialtyResponseDto>> {
    return await this.get<PaginatedResponse<SpecialtyResponseDto>>('/specialties', { params })
  }

  async create(dto: CreateSpecialtyDto): Promise<SpecialtyResponseDto> {
    return await this.post<SpecialtyResponseDto>('/specialties', dto)
  }

  async update(id: number, dto: UpdateSpecialtyDto): Promise<SpecialtyResponseDto> {
    return await this.patch<SpecialtyResponseDto>(`/specialties/${id}`, dto)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/specialties/${id}`)
  }
}

export const specialtyService = new SpecialtyService()
