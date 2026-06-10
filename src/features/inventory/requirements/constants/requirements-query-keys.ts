import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'

export const REQUIREMENT_QUERY_KEYS = {
  all: ['requirements'] as const,
  list: (filters: FindInventoryRequirementsDto) => [...REQUIREMENT_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...REQUIREMENT_QUERY_KEYS.all, 'detail', id] as const,
}
