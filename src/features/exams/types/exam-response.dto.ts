import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type ExamResponseDto = AuditResponseDto & {
  id: number
  name: string
  isActive: boolean
}