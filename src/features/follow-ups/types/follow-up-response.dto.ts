import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { FollowUpStatusEnum } from './follow-up-status.enum'
import type { FollowUpOriginTypeEnum } from './follow-up-origin-type.enum'

export interface FollowUpResponseDto extends AuditResponseDto {
  id: number
  clinicalHistoryId: number
  scheduledAt: string
  status: FollowUpStatusEnum
  fulfilledByAttentionId: number | null
  fulfilledAt: string | null
  reason: string | null
  originType: FollowUpOriginTypeEnum
  originAttentionId: number | null
  originAccidentId: number | null
}