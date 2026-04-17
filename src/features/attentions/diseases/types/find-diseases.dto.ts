import type { QueryParams } from '@/core/types/query-params.type'

export type FindDiseasesDto = QueryParams & {
  code?: string
  name?: string
  category?: string
  isActive?: boolean
}