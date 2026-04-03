import type { QueryParams } from '@/core/types/query-params.type'

export type FindTherapeuticCategoriesDto = QueryParams & {
  name?: string
  isActive?: boolean
}