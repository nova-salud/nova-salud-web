export type ConfirmInventoryRequirementItemDto = {
  itemId: number
  isReceived: boolean
  receivedQuantity: number
}

export type ConfirmInventoryRequirementDto = {
  items: ConfirmInventoryRequirementItemDto[]
}