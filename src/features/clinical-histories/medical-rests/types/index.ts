import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type MedicalRestResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  accidentId: number | null
  attentionId: number | null
  startDate: string
  endDate: string
  notes: string | null
  fileName: string | null
  fileUrl: string | null
  fileType: string | null
}

export type CreateMedicalRestDto = {
  clinicalHistoryId: number
  accidentId?: number
  attentionId?: number
  startDate: string
  endDate: string
  notes?: string
}
