export type CreateDispensationItemDto = {
  medicationId: number
  quantity: number
  doseInstruction?: string
  observation?: string
}