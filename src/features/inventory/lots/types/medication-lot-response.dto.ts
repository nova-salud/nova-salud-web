import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type MedicationLotResponseDto = AuditResponseDto & {
  id: number
  inventoryDeliveryId: number | null
  lotCode: string
  expirationDate: string
  initialQuantity: number
  currentQuantity: number
  receivedByUserId: number
  receivedByUserName: string | null
  receivedAt: string
  medication: {
    id: number
    commercialName: string
  }
}