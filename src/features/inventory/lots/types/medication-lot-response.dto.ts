export type MedicationLotResponseDto = {
  id: number
  inventoryDeliveryId: number | null
  lotCode: string
  expirationDate: string
  initialQuantity: number
  currentQuantity: number
  receivedByUserId: number
  receivedByUserName: string | null
  receivedAt: string
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
  medication: {
    id: number
    commercialName: string
  }
}