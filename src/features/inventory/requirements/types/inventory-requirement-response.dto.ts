import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { InventoryRequirementItemResponseDto } from './inventory-requirement-item-response.dto'
import type { InventoryRequirementStatusEnum } from './inventory-requirement-status.enum'

export type InventoryRequirementResponseDto = AuditResponseDto & {
  id: number
  requestedByUserId: number
  deliveredByUserId: number | null
  status: InventoryRequirementStatusEnum
  requestNote: string | null
  deliveryNote: string | null
  evidenceUrl: string | null
  deliveredAt: string | null
  receivedAt: string | null
  items: InventoryRequirementItemResponseDto[]
}

//TODO: change to map
export const getStatusLabel = (status: InventoryRequirementResponseDto['status']) => {
  switch (status) {
    case 'PENDING':
      return 'Pendiente'
    case 'DELIVERED':
      return 'Entregado'
    case 'RECEIVED_PARTIAL':
      return 'Recepción parcial'
    case 'RECEIVED_COMPLETE':
      return 'Recepción completa'
    case 'CANCELLED':
      return 'Cancelado'
    default:
      return status
  }
}

export const getStatusClassName = (status: InventoryRequirementResponseDto['status']) => {
  switch (status) {
    case 'PENDING':
      return 'border-amber-100 bg-amber-50 text-amber-700'
    case 'DELIVERED':
      return 'border-sky-100 bg-sky-50 text-sky-700'
    case 'RECEIVED_PARTIAL':
      return 'border-orange-100 bg-orange-50 text-orange-700'
    case 'RECEIVED_COMPLETE':
      return 'border-emerald-100 bg-emerald-50 text-emerald-700'
    case 'CANCELLED':
      return 'border-red-100 bg-red-50 text-red-600'
    default:
      return 'border-slate-200 bg-slate-50 text-slate-500'
  }
}