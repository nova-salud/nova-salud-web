export type MedicationResponseDto = {
  id: number
  commercialName: string
  genericName: string | null
  chemicalComposition: string
  therapeuticCategoryId: number
  presentation: string | null
  unitOfMeasure: string
  minimumStock: number
  isOtc: boolean
  requiresPrescription: boolean
  isActive: boolean
  notes: string | null
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
  therapeuticCategory: {
    id: number
    name: string
  }
}