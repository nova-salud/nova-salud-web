import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type AllergyTypeResponseDto = AuditResponseDto & {
  id: number
  name: string
  isActive: boolean
}
