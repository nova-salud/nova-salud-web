import type { EmployeeAreaResponseDto } from './employee-area-response.dto'

export type EmployeeResponseDto = {
  id: number
  externalId: number
  dni: string
  firstName: string
  lastName: string
  fullName: string
  birthDate: string | null
  areaId: number
  area: EmployeeAreaResponseDto
  position: string | null
  immediateBoss: string | null
  employmentStatus: string
  isActive: boolean
  lastSyncedAt: string | null
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
}