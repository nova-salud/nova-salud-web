
import { ApiService } from '@/core/api/api.service'
import type {
  CreateEmoProtocolDto,
  EmoProtocolResponseDto,
  FindEmoProtocolsDto,
  UpdateEmoProtocolDto,
} from '../types'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'

class EmoProtocolService extends ApiService {
  async findAll(params: FindEmoProtocolsDto): Promise<PaginatedResponse<EmoProtocolResponseDto>> {
    return await this.get<PaginatedResponse<EmoProtocolResponseDto>>(
      '/emo-protocols',
      { params },
    )
  }

  async findById(id: number): Promise<EmoProtocolResponseDto> {
    return await this.get<EmoProtocolResponseDto>(`/emo-protocols/${id}`)
  }

  async create(dto: CreateEmoProtocolDto): Promise<EmoProtocolResponseDto> {
    return await this.post<EmoProtocolResponseDto>('/emo-protocols', dto)
  }

  async update(id: number, dto: UpdateEmoProtocolDto): Promise<EmoProtocolResponseDto> {
    return await this.patch<EmoProtocolResponseDto>(`/emo-protocols/${id}`, dto)
  }

  async assignOrUnassignArea(
    id: number,
    areaId: number,
  ): Promise<EmoProtocolResponseDto> {
    return await this.patch<EmoProtocolResponseDto>(
      `/emo-protocols/${id}/areas`,
      { areaId },
    )
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/emo-protocols/${id}`)
  }
}

export const emoProtocolService = new EmoProtocolService()