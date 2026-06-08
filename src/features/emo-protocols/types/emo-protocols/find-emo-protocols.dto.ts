import type { QueryParams } from '@/core/types/query-params.type'

export type FindEmoProtocolsDto = QueryParams & {
  name?: string
  isActive?: boolean
}