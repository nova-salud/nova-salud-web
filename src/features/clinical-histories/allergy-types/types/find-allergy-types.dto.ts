import type { QueryParams } from '@/core/types/query-params.type'

export type FindAllergyTypesDto = QueryParams & {
  search?: string
  isActive?: boolean
}
