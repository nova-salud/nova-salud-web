import type { FindAttentionsParams } from '../services/attention.service'

export const ATTENTION_QUERY_KEYS = {
  all: ['attentions'] as const,
  list: (filters: FindAttentionsParams) => [...ATTENTION_QUERY_KEYS.all, filters],
  detail: (id: number) => [...ATTENTION_QUERY_KEYS.all, id] as const,
}
