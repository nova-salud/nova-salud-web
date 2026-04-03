import type { QueryParams } from '@/core/types/query-params.type'

export type FindInventoryMovementsDto = QueryParams &{
  medicationId?: number
  medicationLotId?: number
  movementType?: string
  performedByUserId?: number
}