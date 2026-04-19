import { ApiService } from '@/core/api/api.service'
import type { AttentionAttachmentResponseDto, CreateAttentionAttachmentDto } from '../types'

class AttentionAttachmentService extends ApiService {
  async findByAttentionId(attentionId: number): Promise<AttentionAttachmentResponseDto[]> {
    return await this.get<AttentionAttachmentResponseDto[]>(
      `/attentions/attachments/attention/${attentionId}`,
    )
  }

  async create(
    dto: CreateAttentionAttachmentDto,
    file: File,
  ): Promise<AttentionAttachmentResponseDto> {
    const formData = new FormData()
    formData.append('attentionId', String(dto.attentionId))

    if (dto.description) {
      formData.append('description', dto.description)
    }

    formData.append('file', file)

    return await this.post<AttentionAttachmentResponseDto>(
      '/attentions/attachments',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/attentions/attachments/${id}`)
  }
}

export const attentionAttachmentService = new AttentionAttachmentService()