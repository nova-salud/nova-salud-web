import type { QueryParams } from '@/core/types/query-params.type'
import type { InventoryRequirementStatusEnum } from './inventory-requirement-status.enum'

export type FindInventoryRequirementsDto = QueryParams & {
  status?: InventoryRequirementStatusEnum
  requestedByUserId?: number
  deliveredByUserId?: number
}