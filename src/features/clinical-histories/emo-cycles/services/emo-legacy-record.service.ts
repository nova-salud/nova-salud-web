import { ApiService } from '@/core/api/api.service'
import type { EmoLegacyRecordDto, CreateEmoLegacyRecordDto } from '../types/emo-legacy-record.types'

class EmoLegacyRecordService extends ApiService {
  async findByClinicalHistoryId(clinicalHistoryId: number): Promise<EmoLegacyRecordDto[]> {
    return this.get<EmoLegacyRecordDto[]>(`/emo-legacy-records/clinical-history/${clinicalHistoryId}`)
  }

  async create(dto: CreateEmoLegacyRecordDto, file?: File): Promise<EmoLegacyRecordDto> {
    const formData = new FormData()
    formData.append('clinicalHistoryId', String(dto.clinicalHistoryId))
    formData.append('evaluatedAt', dto.evaluatedAt)
    if (dto.emoType) formData.append('emoType', dto.emoType)
    if (dto.conclusion) formData.append('conclusion', dto.conclusion)
    if (dto.notes) formData.append('notes', dto.notes)
    if (file) formData.append('file', file)

    return this.post<EmoLegacyRecordDto>('/emo-legacy-records', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async remove(id: number): Promise<void> {
    return this.delete(`/emo-legacy-records/${id}`)
  }
}

export const emoLegacyRecordService = new EmoLegacyRecordService()
