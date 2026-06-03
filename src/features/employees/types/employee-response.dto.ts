import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { EmployeeAreaResponseDto } from './employee-area-response.dto'
import type { EmployeePositionResponseDto } from './employee-position-response.dto'

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
  position: EmployeePositionResponseDto | null
  immediateBoss: string | null
  employmentStatus: string
  isActive: boolean
  isVetoed: boolean
  isBlocked: boolean
  lastSyncedAt: string | null
}
