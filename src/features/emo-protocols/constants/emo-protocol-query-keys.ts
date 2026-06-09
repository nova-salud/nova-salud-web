import type { FindEmoProtocolsDto } from '../types'

export const EMO_PROTOCOL_QUERY_KEYS = {
  all: ['emo-protocols'] as const,
  list: (filters: FindEmoProtocolsDto) => [...EMO_PROTOCOL_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...EMO_PROTOCOL_QUERY_KEYS.all, id] as const,
}