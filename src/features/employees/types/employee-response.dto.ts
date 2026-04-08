import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { EmployeeAreaResponseDto } from './employee-area-response.dto'

export type EmployeeResponseDto = AuditResponseDto & {
  id: number
  externalId: number
  dni: string
  firstName: string
  lastName: string
  fullName: string
  company: string
  birthDate: string | null
  areaId: number
  area: EmployeeAreaResponseDto
  position: string | null
  immediateBoss: string | null
  employmentStatus: string
  isActive: boolean
  lastSyncedAt: string | null
}