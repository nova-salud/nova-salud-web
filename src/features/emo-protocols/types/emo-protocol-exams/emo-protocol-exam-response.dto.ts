import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmoProtocolExamResponseDto = AuditResponseDto & {
  id: number
  emoProtocolId: number
  examId: number
  examName: string | null
  isRequired: boolean
  orderIndex: number
}