import type { CreateInventoryRequirementItemDto } from './create-inventory-requirement-item.dto'

export type CreateInventoryRequirementDto = {
  requestNote?: string
  items: CreateInventoryRequirementItemDto[]
}