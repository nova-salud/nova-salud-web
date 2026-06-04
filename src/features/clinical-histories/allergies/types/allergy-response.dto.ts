export type MedicationDto = {
  id: number
  name: string
}

export type AllergyTypeDto = {
  id: number
  name: string
}

export type AllergyResponseDto = {
  id: number
  clinicalHistoryId: number
  medicationId: number
  medication: MedicationDto
  allergyTypeId: number | null
  allergyType: AllergyTypeDto | null
  reaction: string | null
  isActive: boolean
  createdAt: Date
  createdBy: number | null
  updatedAt: Date | null
  updatedBy: number | null
}
