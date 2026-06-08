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
  email: string | null
  immediateBoss: string | null
  employmentStatus: string
  isActive: boolean
  isVetoed: boolean
  isBlocked: boolean
  lastSyncedAt: string | null

  // Personal
  paternalLastName: string | null
  maternalLastName: string | null
  sex: string | null
  maritalStatus: string | null
  docTypeId: number | null
  phone: string | null
  personalEmail: string | null
  bloodGroup: string | null

  // Laboral
  admissionDate: string | null
  dismissalDate: string | null
  contractStartDate: string | null
  contractEndDate: string | null
  contractTypeId: number | null
  workerTypeId: number | null
  educationLevelId: number | null
  childrenCount: number | null

  // Salud / Seguro
  medicalInsurance: string | null
  eps: string | null
  epsPlan: string | null
  sctrHealth: string | null

  // IDs externos (trazabilidad interna)
  extPositionId: number | null
  extAreaId: number | null
  extBossId: number | null
  extEpsId: number | null
  extEpsPlanId: number | null
  extSctrId: number | null
  extInsuranceId: number | null
  extSexId: number | null
  extMaritalStatusId: number | null
  extBloodGroupId: number | null
}
