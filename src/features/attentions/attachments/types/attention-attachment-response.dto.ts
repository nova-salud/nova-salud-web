import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type AttentionAttachmentResponseDto = AuditResponseDto & {
  id: number
  attentionId: number
  fileName: string
  fileUrl: string
  fileType: string | null
  description: string | null
}