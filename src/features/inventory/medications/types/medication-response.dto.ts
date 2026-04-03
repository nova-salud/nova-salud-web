import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { TherapeuticCategoryResponseDto } from '../../therapeutic-categories/types/therapeutic-category-response.dto'

export type MedicationResponseDto = AuditResponseDto & {
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
  therapeuticCategory: TherapeuticCategoryResponseDto
}