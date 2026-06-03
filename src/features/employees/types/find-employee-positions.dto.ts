import type { QueryParams } from '@/core/types/query-params.type'

export type FindEmployeePositionsDto = QueryParams & {
  name?: string
  isActive?: boolean
}
