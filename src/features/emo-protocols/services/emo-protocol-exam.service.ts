
import { ApiService } from '@/core/api/api.service'
import type {
  CreateEmoProtocolExamDto,
  EmoProtocolExamResponseDto,
  UpdateEmoProtocolExamDto,
} from '../types'

class EmoProtocolExamService extends ApiService {
  async findByProtocolId(emoProtocolId: number): Promise<EmoProtocolExamResponseDto[]> {
    return await this.get<EmoProtocolExamResponseDto[]>(
      `/emo-protocols/exams/protocol/${emoProtocolId}`,
    )
  }

  async findById(id: number): Promise<EmoProtocolExamResponseDto> {
    return await this.get<EmoProtocolExamResponseDto>(`/emo-protocols/exams/${id}`)
  }

  async create(dto: CreateEmoProtocolExamDto): Promise<EmoProtocolExamResponseDto> {
    return await this.post<EmoProtocolExamResponseDto>('/emo-protocols/exams', dto)
  }

  async update(id: number, dto: UpdateEmoProtocolExamDto): Promise<EmoProtocolExamResponseDto> {
    return await this.patch<EmoProtocolExamResponseDto>(`/emo-protocols/exams/${id}`, dto)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/emo-protocols/exams/${id}`)
  }
}

export const emoProtocolExamService = new EmoProtocolExamService()