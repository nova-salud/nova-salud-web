import type { QueryParams } from '@/core/types/query-params.type'

export type FindHealthcareCentersDto = QueryParams & {
  name?: string
  isActive?: boolean
}