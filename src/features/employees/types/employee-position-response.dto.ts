import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmployeePositionResponseDto = AuditResponseDto & {
  id: number
  name: string
  isActive: boolean
}
