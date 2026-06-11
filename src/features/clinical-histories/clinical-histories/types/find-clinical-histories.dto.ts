import type { QueryParams } from '@/core/types/query-params.type'

export type FindClinicalHistoriesDto = QueryParams & {
  employeeId?: number
  isActive?: boolean
  fullName?: string
  dni?: string
  areaId?: number
  company?: string
  emoCycleStatus?: string
  conclusion?: string
}