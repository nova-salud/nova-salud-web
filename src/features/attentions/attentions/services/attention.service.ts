import { ApiService } from '@/core/api/api.service'
import type { AttentionResponseDto, CreateAttentionDto } from '../types'

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
}

export const attentionService = new AttentionService()