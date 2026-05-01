import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { AccidentCaseStatusEnum } from './accident-case-status.enum'
import type { AccidentDischargeTypeEnum } from './accident-discharge-type.enum'
import type { EmployeeRestrictionResponseDto } from '../../employee-restrinctions/types'

export interface AccidentCaseResponseDto extends AuditResponseDto {
  id: number
  accidentId: number
  clinicalHistoryId: number
  status: AccidentCaseStatusEnum
  dischargeType: AccidentDischargeTypeEnum | null
  isBlocked: boolean
  sctrActivated: boolean
  behavioralFlag: boolean
  isPrimary: boolean
  restrictions: EmployeeRestrictionResponseDto[]
}