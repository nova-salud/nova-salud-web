export type CreateMedicationLotDto = {
  medicationId: number
  lotCode: string
  expirationDate: string
  initialQuantity: number
  receivedByUserId: number
}
