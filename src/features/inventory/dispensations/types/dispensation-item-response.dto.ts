import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type DispensationItemResponseDto = AuditResponseDto & {
  id: number
  dispensationId: number
  medicationId: number
  medicationName: string | null
  medicationLotId: number
  lotCode: string | null
  quantity: number
  doseInstruction: string | null
  observation: string | null
}