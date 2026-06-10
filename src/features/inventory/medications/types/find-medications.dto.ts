import type { QueryParams } from '@/core/types/query-params.type'

export type FindMedicationsDto = QueryParams & {
  commercialName?: string
  therapeuticCategoryId?: number
  isOtc?: boolean
  isActive?: boolean
  lowStock?: boolean
}
