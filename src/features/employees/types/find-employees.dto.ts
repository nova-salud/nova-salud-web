import type { QueryParams } from '@/core/types/query-params.type'

export type FindEmployeesDto = QueryParams & {
  dni?: string
  fullName?: string
  areaId?: number
  positionId?: number
  isActive?: boolean
  company?: string
  isExternal?: boolean
  areaName?: string
}