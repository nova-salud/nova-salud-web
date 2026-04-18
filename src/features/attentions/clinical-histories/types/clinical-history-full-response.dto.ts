import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'

export type ClinicalHistoryAllergyResponseDto = {
  id: number
  clinicalHistoryId: number
  allergen: string
  medicationId: number | null
  reaction: string | null
  isActive: boolean
}

export type ClinicalHistoryAttentionAttachmentResponseDto = {
  id: number
  attentionId: number
  fileName: string
  fileUrl: string
  fileType: string | null
  description: string | null
}

export type ClinicalHistoryAttentionSignatureResponseDto = {
  id: number
  employeeId: number
  attentionId: number
  fullName: string
  ipAddress: string | null
  signatureData: string | null
  signedAt: Date
}

export type ClinicalHistoryAttentionResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  attendedByUserId: number
  symptoms: string | null
  diagnosisCode: string | null
  eva: number | null
  treatment: string | null
  notes: string | null
  attachments: ClinicalHistoryAttentionAttachmentResponseDto[]
  signatures: ClinicalHistoryAttentionSignatureResponseDto[]
}

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

  employee: EmployeeResponseDto
  allergies: ClinicalHistoryAllergyResponseDto[]
  attentions: ClinicalHistoryAttentionResponseDto[]
}