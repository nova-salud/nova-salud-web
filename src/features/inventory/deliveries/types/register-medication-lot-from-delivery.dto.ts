export type RegisterMedicationLotFromDeliveryDto = {
  medicationId: number
  lotCode: string
  expirationDate: string
  initialQuantity: number
  receivedByUserId: number
}