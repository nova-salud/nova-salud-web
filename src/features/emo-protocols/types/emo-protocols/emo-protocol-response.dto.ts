import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { EmployeeAreaResponseDto } from '@/features/employees/types/employee-area-response.dto'
import type { EmployeePositionResponseDto } from '@/features/employees/types/employee-position-response.dto'

export type EmoProtocolResponseDto = AuditResponseDto & {
  id: number
  name: string
  emoType: string | null
  isActive: boolean
  daysToExpire: number
  nextEmoDaysFit: number
  nextEmoDaysFitWithRestrictions: number
  areas: EmployeeAreaResponseDto[]
  positions: EmployeePositionResponseDto[]
}
