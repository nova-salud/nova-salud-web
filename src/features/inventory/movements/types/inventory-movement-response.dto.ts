import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type InventoryMovementResponseDto = AuditResponseDto & {
  id: number
  medicationId: number
  medicationName: string
  medicationLotId: number | null
  lotCode: string | null
  movementType: string
  quantity: number
  reason: string
  performedByUserId: number
  performedByUserName: string | null
  relatedDispenseId: number | null
  relatedAttentionId: number | null
  notes: string | null
}