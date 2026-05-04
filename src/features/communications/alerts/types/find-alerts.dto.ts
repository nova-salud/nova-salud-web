import type { QueryParams } from '@/core/types/query-params.type'
import type { AlertType } from './alert-type.enum'
import type { AlertPriority } from './alert-priority.enum'

export interface FindAlertsDto extends QueryParams {
  isResolved?: boolean
  type?: AlertType
  priority?: AlertPriority
  employeeId?: number
}