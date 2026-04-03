export type DispensationLotItemResponseDto = {
  id: number
  dispensationId: number
  medicationId: number
  medicationName: string
  medicationLotId: number
  medicationLotCode: string
  quantity: number
  doseInstruction: string | null
  observation: string | null
}