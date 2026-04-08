import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmployeeAreaResponseDto = AuditResponseDto &{
  id: number
  externalId: number | null
  name: string
  isActive: boolean
}