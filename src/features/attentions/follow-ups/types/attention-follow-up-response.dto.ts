import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { FollowUpStatusEnum } from './follow-up-status.enum'

export interface AttentionFollowUpResponseDto extends AuditResponseDto {
  id: number
  attentionId: number
  scheduledAt: string
  status: FollowUpStatusEnum
  fulfilledByAttentionId: number | null
  fulfilledAt: string | null
  reason: string | null
}