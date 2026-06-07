import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export interface AccidentInvestigationResponseDto extends AuditResponseDto {
  id: number
  accidentId: number
  responsible: string
  findings: string
  rootCause: string
  correctiveMeasures: string
}
