import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmployeePositionResponseDto = AuditResponseDto & {
  id: number
  externalId: number | null
  name: string
  isActive: boolean
  isConfidence: boolean
  category: 'EJECUTIVO' | 'EMPLEADO' | 'OBRERO' | null
  functions: string | null
}
