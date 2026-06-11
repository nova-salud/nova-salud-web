
import { ApiService } from '@/core/api/api.service'
import type { CancelEmoCycleDto, ClinicalHistoryEmoCycleResponseDto, EmitClinicalHistoryConclusionDto, SignClinicalHistoryConformityDto } from '../types'

class ClinicalHistoryEmoCycleService extends ApiService {
  async create(
    clinicalHistoryId: number
  ): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.post<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${clinicalHistoryId}`,
    )
  }

  async findById(
    id: number,
  ): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.get<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}`,
    )
  }

  async findByEmployeeId(
    employeeId: number,
  ): Promise<ClinicalHistoryEmoCycleResponseDto[]> {
    return await this.get<ClinicalHistoryEmoCycleResponseDto[]>(
      `/clinical-history-emo-cycles/employee/${employeeId}`,
    )
  }

  async findByClinicalHistoryId(
    clinicalHistoryId: number,
  ): Promise<ClinicalHistoryEmoCycleResponseDto[]> {
    return await this.get<ClinicalHistoryEmoCycleResponseDto[]>(
      `/clinical-history-emo-cycles/clinical-history/${clinicalHistoryId}`,
    )
  }

  async findActiveByClinicalHistoryId(
    clinicalHistoryId: number,
  ): Promise<ClinicalHistoryEmoCycleResponseDto | null> {
    return await this.get<ClinicalHistoryEmoCycleResponseDto | null>(
      `/clinical-history-emo-cycles/clinical-history/${clinicalHistoryId}/active`,
    )
  }

  async generateNext(clinicalHistoryId: number): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.post<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${clinicalHistoryId}/generate-next`,
    )
  }

  async cancel(id: number, dto: CancelEmoCycleDto): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.patch<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}/cancel`,
      dto,
    )
  }

  async confirmExamReview(id: number): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.patch<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}/confirm-exam-review`,
    )
  }

  async emitConclusion(
    id: number,
    dto: EmitClinicalHistoryConclusionDto,
  ): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.patch<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}/emit-conclusion`,
      dto,
    )
  }

  async signConformity(
    id: number,
    dto: SignClinicalHistoryConformityDto,
  ): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.patch<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}/sign-conformity`,
      dto,
    )
  }

  async sendIncompleteNotification(id: number): Promise<void> {
    await this.post<void>(
      `/clinical-history-emo-cycles/${id}/send-incomplete-notification`,
    )
  }

  async attachFinalReport(id: number, file: File): Promise<ClinicalHistoryEmoCycleResponseDto> {
    const formData = new FormData()
    formData.append('file', file)

    return await this.patch<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}/attach-final-report`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
  }
}

export const clinicalHistoryEmoCycleService = new ClinicalHistoryEmoCycleService()