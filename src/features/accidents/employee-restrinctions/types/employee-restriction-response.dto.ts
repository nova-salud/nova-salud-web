import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export interface EmployeeRestrictionResponseDto extends AuditResponseDto {
  id: number
  employeeId: number
  accidentCaseId: number
  description: string
  startDate: Date
  endDate: Date | null
  isActive: boolean
}