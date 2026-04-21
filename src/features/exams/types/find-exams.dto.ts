import type { QueryParams } from '@/core/types/query-params.type'

export type FindExamsDto = QueryParams & {
  search?: string
  isActive?: boolean
}