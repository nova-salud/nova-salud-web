
import { ApiService } from '@/core/api/api.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'

class ClinicalHistoryEmoCycleService extends ApiService {
  async findById(
    id: number,
  ): Promise<ClinicalHistoryEmoCycleResponseDto> {
    return await this.get<ClinicalHistoryEmoCycleResponseDto>(
      `/clinical-history-emo-cycles/${id}`,
    )
  }

  async findActiveByClinicalHistoryId(
    clinicalHistoryId: number,
  ): Promise<ClinicalHistoryEmoCycleResponseDto | null> {
    return await this.get<ClinicalHistoryEmoCycleResponseDto | null>(
      `/clinical-history-emo-cycles/clinical-history/${clinicalHistoryId}/active`,
    )
  }
}

export const clinicalHistoryEmoCycleService = new ClinicalHistoryEmoCycleService()