import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type HealthcareCenterResponseDto = AuditResponseDto & {
  id: number
  name: string
  ruc: string | null
  address: string | null
  phone: string | null
  isActive: boolean
}