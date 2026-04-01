import type { InventoryRequirementStatusEnum } from './inventory-requirement-status.enum'

export type FindInventoryRequirementsDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  status?: InventoryRequirementStatusEnum
  requestedByUserId?: number
  deliveredByUserId?: number
}