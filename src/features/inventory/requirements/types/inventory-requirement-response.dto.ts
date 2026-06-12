import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { InventoryRequirementItemResponseDto } from './inventory-requirement-item-response.dto'
import type { InventoryRequirementStatusEnum } from './inventory-requirement-status.enum'

export type InventoryRequirementResponseDto = AuditResponseDto & {
  id: number
  code: string
  requestedByUserId: number
  requestedByUserName: string
  deliveredByUserId: number | null
  deliveredByUserName: string | null
  status: InventoryRequirementStatusEnum
  requestNote: string | null
  deliveryNote: string | null
  evidenceUrl: string | null
  deliveredAt: string | null
  receivedAt: string | null
  totalCost: number | null
  items: InventoryRequirementItemResponseDto[]
}

export const STATUS_LABELS: Record<InventoryRequirementStatusEnum, string> = {
  PENDING: 'Pendiente',
  DELIVERED: 'Entregado',
  RECEIVED_PARTIAL: 'Recepción parcial',
  RECEIVED_COMPLETE: 'Recepción completa',
  CANCELLED: 'Cancelado',
}

export const STATUS_CLASSES: Record<InventoryRequirementStatusEnum, string> = {
  PENDING: 'border-amber-100 bg-amber-50 text-amber-700',
  DELIVERED: 'border-sky-100 bg-sky-50 text-sky-700',
  RECEIVED_PARTIAL: 'border-orange-100 bg-orange-50 text-orange-700',
  RECEIVED_COMPLETE: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  CANCELLED: 'border-red-100 bg-red-50 text-red-600',
}
