import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { EmployeeAreaResponseDto } from '@/features/employees/types/employee-area-response.dto'

export type EmoProtocolResponseDto = AuditResponseDto & {
  id: number
  name: string
  isActive: boolean

  areas: EmployeeAreaResponseDto[]
}