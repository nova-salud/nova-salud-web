import type { QueryParams } from '@/core/types/query-params.type'
import type { DispenseTypeEnum } from './dispense-type.enum'

export type FindDispensationsDto = QueryParams & {
  dispenseType?: DispenseTypeEnum
  collaboratorDni?: string
  thirdPartyDni?: string
  attentionId?: number
  dispensedByUserId?: number
}