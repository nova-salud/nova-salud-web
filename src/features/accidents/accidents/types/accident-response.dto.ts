import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { HealthcareCenterResponseDto } from '@/features/healthcare-centers/types'
import type { UserResponseDto } from '@/features/users/types'
import type { AccidentTypeEnum } from './accident-type.enum'
import type { AccidentStatusEnum } from './accident-status.enum'
import type { AccidentSeverityEnum } from './accident-severity.enum'
import type { AccidentFormEnum } from './accident-form.enum'
import type { AccidentLaborRelationEnum } from './accident-labor-relation.enum'
import type { AccidentCaseResponseDto } from '../../accident-cases/types/accident-case-response.dto'
import type { FollowUpResponseDto } from '@/features/follow-ups/types/follow-up-response.dto'
import type { AccidentInvestigationResponseDto } from './accident-investigation-response.dto'

export interface AccidentResponseDto extends AuditResponseDto {
  id: number
  employeeFullName: string | null

  clinicalHistoryId: number
  employeeId: number
  reportedByUserId: number
  reportedByUser: UserResponseDto | null

  type: AccidentTypeEnum
  description: string
  occurredAt: Date

  requiresExternalReferral: boolean
  healthcareCenterId: number | null
  healthcareCenter: HealthcareCenterResponseDto | null

  status: AccidentStatusEnum

  severityClassification: AccidentSeverityEnum | null
  formClassification: AccidentFormEnum | null
  laborRelationClassification: AccidentLaborRelationEnum | null

  accidentCase: AccidentCaseResponseDto | null
  investigation: AccidentInvestigationResponseDto | null

  followUps: FollowUpResponseDto[]
}
