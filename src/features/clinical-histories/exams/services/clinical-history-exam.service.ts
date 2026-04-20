import { ApiService } from '@/core/api/api.service'
import type { ClinicalHistoryExamResponseDto, CreateClinicalHistoryExamDto } from '../types'
import type { CompleteClinicalHistoryExamDto } from '../types/complete-clinical-history-exam.dto'

class ClinicalHistoryExamService extends ApiService {
  async findByClinicalHistory(
    clinicalHistoryId: number,
  ): Promise<ClinicalHistoryExamResponseDto[]> {
    return await this.get<ClinicalHistoryExamResponseDto[]>(
      `/clinical-histories/exams/clinical-history/${clinicalHistoryId}`,
    )
  }

  async create(
    dto: CreateClinicalHistoryExamDto,
  ): Promise<ClinicalHistoryExamResponseDto> {
    return await this.post<ClinicalHistoryExamResponseDto>(
      '/clinical-histories/exams',
      dto,
    )
  }


  async remove(id: number): Promise<void> {
    await this.delete(`/clinical-histories/exams/${id}`)
  }

  async complete(
    id: number,
    dto: CompleteClinicalHistoryExamDto,
    file: File,
  ): Promise<ClinicalHistoryExamResponseDto> {
    const formData = new FormData()
    formData.append('resultNote', dto.resultNote)
    formData.append('file', file)

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