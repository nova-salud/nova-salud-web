import { ApiService } from '@/core/api/api.service'
import type { AccidentInvestigationResponseDto } from '../types'

export interface CreateAccidentInvestigationDto {
  responsible: string
  findings: string
  rootCause: string
  correctiveMeasures: string
}

export interface UpdateAccidentInvestigationDto {
  responsible?: string
  findings?: string
  rootCause?: string
  correctiveMeasures?: string
}

class AccidentInvestigationService extends ApiService {
  async create(accidentId: number, dto: CreateAccidentInvestigationDto) {
    return await this.post<AccidentInvestigationResponseDto>(
      `/accidents/${accidentId}/investigation`,
      dto,
    )
  }

  async update(accidentId: number, dto: UpdateAccidentInvestigationDto) {
    return await this.patch<AccidentInvestigationResponseDto>(
      `/accidents/${accidentId}/investigation`,
      dto,
    )
  }
}

export const accidentInvestigationService = new AccidentInvestigationService()
