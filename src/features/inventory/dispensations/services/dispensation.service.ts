import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { CreateDispensationDto } from '../types/create-dispensation.dto'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'
import type { FindDispensationsDto } from '../types/find-dispensations.dto'

class DispensationService extends ApiService {
  async findAll(
    query: FindDispensationsDto,
  ): Promise<PaginatedResponse<DispensationResponseDto>> {
    return await this.getPaginated<DispensationResponseDto>(
      '/inventory/dispensations',
      { params: query },
    )
  }

  async findById(id: number): Promise<DispensationResponseDto> {
    return await this.get<DispensationResponseDto>(
      `/inventory/dispensations/${id}`,
    )
  }

  async findByAttentionId(attentionId: number): Promise<DispensationResponseDto> {
    return await this.get<DispensationResponseDto>(
      `/inventory/dispensations/attention/${attentionId}`,
    )
  }

  async create(dto: CreateDispensationDto): Promise<DispensationResponseDto> {
    return await this.post<DispensationResponseDto, CreateDispensationDto>(
      '/inventory/dispensations',
      dto,
    )
  }
}

export const dispensationService = new DispensationService()