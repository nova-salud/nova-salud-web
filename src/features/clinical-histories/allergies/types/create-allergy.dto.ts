export type CreateAllergyDto = {
  clinicalHistoryId: number
  medicationId: number
  allergyTypeId?: number
  reaction?: string
}
