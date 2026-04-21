import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type ClinicalHistoryConformityResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  emoCycleId: number
  employeeId: number
  conformityType: 'DOCTOR' | 'EMPLOYEE'
  fullName: string
  signatureData: string | null
  signedAt: Date
}