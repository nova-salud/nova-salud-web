import type { QueryParams } from '@/core/types/query-params.type'
import type { AccidentStatusEnum } from './accident-status.enum'
import type { AccidentTypeEnum } from './accident-type.enum'

export interface FindAccidentsDto extends QueryParams {
  clinicalHistoryId?: number
  status?: AccidentStatusEnum
  type?: AccidentTypeEnum
}