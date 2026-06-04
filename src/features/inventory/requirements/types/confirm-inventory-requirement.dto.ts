export type ConfirmInventoryRequirementItemDto = {
  itemId: number
  isReceived: boolean
  receivedQuantity: number
  lotCode?: string
  expirationDate?: string
  totalCost?: number
}

export type ConfirmInventoryRequirementDto = {
  items: ConfirmInventoryRequirementItemDto[]
}