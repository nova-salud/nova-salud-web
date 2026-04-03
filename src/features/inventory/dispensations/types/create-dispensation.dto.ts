import type { DispenseTypeEnum } from './dispense-type.enum'
import type { CreateDispensationItemDto } from './create-dispensation-item.dto'

export type CreateDispensationDto = {
  dispenseType: DispenseTypeEnum
  collaboratorDni?: string
  thirdPartyDni?: string
  attentionId?: number
  diagnosisCode?: string
  reason: string
  notes?: string
  items: CreateDispensationItemDto[]
}