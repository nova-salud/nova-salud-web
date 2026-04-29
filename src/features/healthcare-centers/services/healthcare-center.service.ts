
import { ApiService } from '@/core/api/api.service'
import type { CreateHealthcareCenterDto, FindHealthcareCentersDto, HealthcareCenterResponseDto, UpdateHealthcareCenterDto } from '../types'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'

class HealthcareCenterService extends ApiService {
  async findAll(params: FindHealthcareCentersDto): Promise<PaginatedResponse<HealthcareCenterResponseDto>> {
    return await this.get<PaginatedResponse<HealthcareCenterResponseDto>>(
      '/healthcare-centers',
      { params },
    )
  }

  async findById(id: number): Promise<HealthcareCenterResponseDto> {
    return await this.get<HealthcareCenterResponseDto>(`/healthcare-centers/${id}`)
  }

  async create(dto: CreateHealthcareCenterDto): Promise<HealthcareCenterResponseDto> {
    return await this.post<HealthcareCenterResponseDto>('/healthcare-centers', dto)
  }

  async update(id: number, dto: UpdateHealthcareCenterDto): Promise<HealthcareCenterResponseDto> {
    return await this.patch<HealthcareCenterResponseDto>(`/healthcare-centers/${id}`, dto)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/healthcare-centers/${id}`)
  }
}

export const healthcareCenterService = new HealthcareCenterService()