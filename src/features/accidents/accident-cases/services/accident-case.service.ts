import { ApiService } from '@/core/api/api.service'
import type { RegisterMedicalDischargeDto } from '../types/register-medical-discharge.dto'
import type { AccidentCaseResponseDto } from '../types/accident-case-response.dto'
import type { CloseAccidentCaseWithConsentDto } from '../types/close-accident-case-with-consent.dto'

class AccidentCaseService extends ApiService {
  async registerDischarge(id: number, dto: RegisterMedicalDischargeDto): Promise<AccidentCaseResponseDto> {
    return await this.patch<AccidentCaseResponseDto>(`/accident-cases/${id}/discharge`, dto)
  }

  async closeCase(id: number): Promise<void> {
    await this.patch(`/accident-cases/${id}/close`)
  }

  async closeWithConsent(
    id: number,
    dto: CloseAccidentCaseWithConsentDto,
  ): Promise<void> {
    await this.post(`/accident-cases/${id}/close-with-consent`, dto)
  }
}

export const accidentCaseService = new AccidentCaseService()