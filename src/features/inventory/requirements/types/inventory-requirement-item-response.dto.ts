export type InventoryRequirementItemResponseDto = {
  id: number
  inventoryRequirementId: number
  medicationId: number
  medicationName: string | null
  requestedQuantity: number
  receivedQuantity: number | null
  isReceived: boolean
  notes: string | null
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
}