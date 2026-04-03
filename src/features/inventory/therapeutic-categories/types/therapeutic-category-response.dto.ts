import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type TherapeuticCategoryResponseDto = AuditResponseDto & {
  id: number
  name: string
  description: string | null
  isActive: boolean
}