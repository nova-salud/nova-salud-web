import type { QueryParams } from '@/core/types/query-params.type'
import type { AccidentStatusEnum } from './accident-status.enum'
import type { AccidentTypeEnum } from './accident-type.enum'
import type { AccidentSeverityEnum } from './accident-severity.enum'
import type { AccidentFormEnum } from './accident-form.enum'

export interface FindAccidentsDto extends QueryParams {
  clinicalHistoryId?: number
  status?: AccidentStatusEnum
  type?: AccidentTypeEnum
  severityClassification?: AccidentSeverityEnum
  formClassification?: AccidentFormEnum
  areaName?: string
}