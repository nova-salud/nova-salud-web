export type InventoryMovementResponseDto = {
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
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
}