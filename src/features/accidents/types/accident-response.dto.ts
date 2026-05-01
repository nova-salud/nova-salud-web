import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { HealthcareCenterResponseDto } from '@/features/healthcare-centers/types'
import type { UserResponseDto } from '@/features/users/types'
import type { AccidentTypeEnum } from './accident-type.enum'
import type { AccidentStatusEnum } from './accident-status.enum'

export interface AccidentResponseDto extends AuditResponseDto {
  id: number

  clinicalHistoryId: number
  reportedByUserId: number
  reportedByUser: UserResponseDto | null

  type: AccidentTypeEnum
  description: string
  occurredAt: Date

  requiresExternalReferral: boolean
  healthcareCenterId: number | null
  healthcareCenter: HealthcareCenterResponseDto | null

  status: AccidentStatusEnum
}