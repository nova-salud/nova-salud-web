import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { DiseaseType } from './disease-type.enum'

export type DiseaseResponseDto = AuditResponseDto & {
  id: number
  code: string
  name: string
  category: string | null
  diseaseType: DiseaseType | null
  isActive: boolean
}