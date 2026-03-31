export type InventoryDeliveryResponseDto = {
  id: number
  deliveredByUserId: number
  receivedByUserId: number | null
  deliveryDate: string
  status: string
  deliveryNote: string | null
  attachmentUrl: string | null
  processedAt: string | null
  cancellationReason: string | null
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
  deliveredByUser?: {
    id: number
    username: string
  }
  receivedByUser?: {
    id: number
    username: string
  } | null
}