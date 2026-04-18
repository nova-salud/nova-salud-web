import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type AttentionResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  attendedByUserId: number

  symptoms: string | null
  diagnosisCode: string | null
  eva: number | null
  treatment: string | null
  notes: string | null
}