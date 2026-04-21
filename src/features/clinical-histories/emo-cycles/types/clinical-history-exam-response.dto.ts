import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type ClinicalHistoryExamResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  emoCycleId: number
  examId: number
  examName: string
  isRequired: boolean
  isCompleted: boolean
  resultNote: string | null
  fileName: string | null
  fileUrl: string | null
  fileType: string | null
}