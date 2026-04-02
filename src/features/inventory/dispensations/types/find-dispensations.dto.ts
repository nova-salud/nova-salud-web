import type { DispenseTypeEnum } from './dispense-type.enum'

export type FindDispensationsDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  dispenseType?: DispenseTypeEnum
  collaboratorDni?: string
  thirdPartyDni?: string
  attentionId?: number
  dispensedByUserId?: number
}