export type DispensationItemResponseDto = {
  id: number
  dispensationId: number
  medicationId: number
  medicationName: string | null
  medicationLotId: number
  lotCode: string | null
  quantity: number
  doseInstruction: string | null
  observation: string | null
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
}