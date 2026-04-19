import { ApiService } from '@/core/api/api.service'
import type { AttentionResponseDto, CreateAttentionDto, CreateAttentionWithDispensationDto } from '../types'

class AttentionService extends ApiService {
  async findById(id: number): Promise<AttentionResponseDto> {
    return await this.get<AttentionResponseDto>(`/attentions/${id}`)
  }

  async create(dto: CreateAttentionDto): Promise<AttentionResponseDto> {
    return await this.post<AttentionResponseDto>(
      '/attentions',
      dto,
    )
  }

  async createWithDispensation(
    dto: CreateAttentionWithDispensationDto,
  ): Promise<AttentionResponseDto> {
    return await this.post<AttentionResponseDto>(
      '/attentions/with-dispensation',
      dto,
    )
  }
}

export const attentionService = new AttentionService()