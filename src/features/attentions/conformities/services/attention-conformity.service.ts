import { ApiService } from '@/core/api/api.service'
import type { AttentionConformityResponseDto, CreateAttentionConformityDto } from '../types/attention-conformity.types'

class AttentionConformityService extends ApiService {
  async create(dto: CreateAttentionConformityDto): Promise<AttentionConformityResponseDto> {
    return this.post<AttentionConformityResponseDto>(`/attentions/${dto.attentionId}/conformity`, dto)
  }

  async findByAttention(attentionId: number): Promise<AttentionConformityResponseDto | null> {
    return this.get<AttentionConformityResponseDto | null>(`/attentions/${attentionId}/conformity`)
  }
}

export const attentionConformityService = new AttentionConformityService()
