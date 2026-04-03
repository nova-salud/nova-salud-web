import type { QueryParams } from '@/core/types/query-params.type'

export type FindInventoryStocksDto = QueryParams & {
  commercialName?: string
  genericName?: string
  therapeuticCategoryId?: number
  isOtc?: boolean
  isActive?: boolean
}