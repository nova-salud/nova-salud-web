import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type AttentionConformityResponseDto = AuditResponseDto & {
  id: number
  attentionId: number
  fullName: string
  signatureData: string | null
  signedAt: string
}

export type CreateAttentionConformityDto = {
  attentionId: number
  fullName: string
  signatureData?: string
}
