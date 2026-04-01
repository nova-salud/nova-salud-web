export type CreateMedicationDto = {
  commercialName: string
  genericName?: string
  chemicalComposition: string
  therapeuticCategoryId: number
  presentation?: string
  unitOfMeasure: string
  minimumStock: number
  isOtc: boolean
  requiresPrescription: boolean
  notes?: string
}