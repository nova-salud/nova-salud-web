import type { QueryParams } from '@/core/types/query-params.type'

export type FindEmoProtocolsDto = QueryParams & {
  search?: string
  isActive?: boolean
}