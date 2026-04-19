import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type SignatureResponseDto = AuditResponseDto & {
  id: number
  employeeId: number
  attentionId: number
  fullName: string
  ipAddress: string | null
  signatureData: string | null
  signedAt: Date
}