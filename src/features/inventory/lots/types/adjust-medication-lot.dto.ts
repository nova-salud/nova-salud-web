export type AdjustMedicationLotDto = {
  movementType: 'ADJUSTMENT_IN' | 'ADJUSTMENT_OUT'
  quantity: number
  performedByUserId: number
  reason: string
}
