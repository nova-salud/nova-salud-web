import { ApiService } from '@/core/api/api.service'
import type { ClinicalHistoryExamResponseDto } from '../../emo-cycles/types'

export type CompleteClinicalHistoryExamDto = {
  resultNote: string
  healthcareCenterId?: number
}

class ClinicalHistoryExamService extends ApiService {
  async complete(
    id: number,
    dto: CompleteClinicalHistoryExamDto,
    file: File,
  ): Promise<ClinicalHistoryExamResponseDto> {
    const formData = new FormData()
    formData.append('resultNote', dto.resultNote)
    formData.append('file', file)
    if (dto.healthcareCenterId) {
      formData.append('healthcareCenterId', String(dto.healthcareCenterId))
    }

    return await this.patch<ClinicalHistoryExamResponseDto>(
      `/clinical-histories/exams/${id}/complete`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}

export const clinicalHistoryExamService = new ClinicalHistoryExamService()