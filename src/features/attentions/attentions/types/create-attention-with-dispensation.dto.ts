export type CreateAttentionWithDispensationItemDto = {
  medicationId: number
  quantity: number
  doseInstruction?: string
  observation?: string
}

export type CreateAttentionWithDispensationDto = {
  employeeId: number
  symptoms?: string
  diagnosisCode?: string
  eva?: number
  treatment?: string
  notes?: string
  requiresDispensation: boolean
  dispensationReason?: string
  dispensationNotes?: string
  dispensationItems?: CreateAttentionWithDispensationItemDto[]
}