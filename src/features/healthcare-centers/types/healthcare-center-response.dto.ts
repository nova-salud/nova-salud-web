import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { HealthcareCenterTypeValue } from './healthcare-center-type.constants'

export type HealthcareCenterResponseDto = AuditResponseDto & {
  id: number
  name: string
  ruc: string | null
  address: string | null
  phone: string | null
  convenio: string | null
  type: HealthcareCenterTypeValue
  contactName: string | null
  contactPhone: string | null
  contactEmail: string | null
  isActive: boolean
}
