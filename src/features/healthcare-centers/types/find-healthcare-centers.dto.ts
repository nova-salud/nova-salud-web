import type { QueryParams } from '@/core/types/query-params.type'

export type FindHealthcareCentersDto = QueryParams & {
  search?: string
  isActive?: boolean
}