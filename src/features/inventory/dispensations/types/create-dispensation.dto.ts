import type { CreateDispensationItemDto } from './create-dispensation-item.dto'
import type { DispenseTypeEnum } from './dispense-type.enum'

export type CreateDispensationDto = {
  dispenseType: DispenseTypeEnum
  collaboratorDni?: string
  thirdPartyDni?: string
  attentionId?: number
  diagnosisCode?: string
  reason: string
  authorizedByUserId?: number
  dispensedByUserId: number
  notes?: string
  items: CreateDispensationItemDto[]
}