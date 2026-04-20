import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type ClinicalHistoryResponseDto = AuditResponseDto & {
  id: number
  employeeId: number

  bloodType: string | null
  emergencyContactName: string | null
  emergencyContactPhone: string | null

  knownConditions: string | null
  surgicalHistory: string | null
  familyHistory: string | null
  observations: string | null

  isActive: boolean
}