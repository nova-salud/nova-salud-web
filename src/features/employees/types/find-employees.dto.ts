import type { QueryParams } from '@/core/types/query-params.type'

export type FindEmployeesDto = QueryParams & {
  dni?: string
  fullName?: string
  areaId?: number
  isActive?: boolean
}