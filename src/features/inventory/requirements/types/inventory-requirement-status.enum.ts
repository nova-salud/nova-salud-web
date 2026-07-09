export const InventoryRequirementStatusEnum = {
  PENDING: 'PENDING',
  IN_PROCESS: 'IN_PROCESS',
  DELIVERED: 'DELIVERED',
  RECEIVED_PARTIAL: 'RECEIVED_PARTIAL',
  RECEIVED_COMPLETE: 'RECEIVED_COMPLETE',
  CANCELLED: 'CANCELLED',
} as const

export type InventoryRequirementStatusEnum =
  typeof InventoryRequirementStatusEnum[keyof typeof InventoryRequirementStatusEnum]