import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { QueryParams } from '@/core/types/query-params.type'
import type { AttentionResponseDto, CreateAttentionDto, CreateAttentionWithDispensationDto } from '../types'

export type FindAttentionsParams = QueryParams & {
  clinicalHistoryId?: number
  employeeId?: number
  triageLevel?: string
  employeeFullName?: string
  diagnosisCode?: string
}

class AttentionService extends ApiService {
  async findAll(params?: FindAttentionsParams): Promise<PaginatedResponse<AttentionResponseDto>> {
    return await this.get<PaginatedResponse<AttentionResponseDto>>('/attentions', { params })
  }

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

  async sendSummary(id: number): Promise<void> {
    await this.post(`/attentions/${id}/send-summary`, {})
  }
}

export const attentionService = new AttentionService()