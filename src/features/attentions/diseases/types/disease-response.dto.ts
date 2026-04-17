import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type DiseaseResponseDto = AuditResponseDto & {
  id: number
  code: string
  name: string
  category: string | null
  isActive: boolean
}