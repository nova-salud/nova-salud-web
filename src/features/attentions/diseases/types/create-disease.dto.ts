import type { DiseaseType } from './disease-type.enum'

export type CreateDiseaseDto = {
  code: string
  name: string
  category?: string
  diseaseType?: DiseaseType
  isActive?: boolean
}