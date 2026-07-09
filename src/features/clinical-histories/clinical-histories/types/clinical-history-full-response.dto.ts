import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { AllergyResponseDto } from '@/features/clinical-histories/allergies/types'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'

export type ClinicalHistoryFullResponseDto = AuditResponseDto & {
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

  noAllergiesConfirmed: boolean
  noAllergiesConfirmedAt: string | null
  noAllergiesConfirmedBy: number | null

  employee: EmployeeResponseDto
  allergies: AllergyResponseDto[]
}