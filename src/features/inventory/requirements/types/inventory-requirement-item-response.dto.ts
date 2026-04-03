import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type InventoryRequirementItemResponseDto = AuditResponseDto & {
  id: number
  inventoryRequirementId: number
  medicationId: number
  medicationName: string | null
  requestedQuantity: number
  receivedQuantity: number | null
  isReceived: boolean
  notes: string | null
}