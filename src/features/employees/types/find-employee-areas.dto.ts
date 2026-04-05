import type { QueryParams } from '@/core/types/query-params.type'

export type FindEmployeeAreasDto = QueryParams & {
  name?: string
  isActive?: boolean
}