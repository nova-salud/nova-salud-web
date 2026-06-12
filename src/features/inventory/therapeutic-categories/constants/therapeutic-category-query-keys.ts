import type { FindTherapeuticCategoriesDto } from '../types/find-therapeutic-categories.dto'

export const THERAPEUTIC_CATEGORY_QUERY_KEYS = {
  all: ['therapeutic-categories'] as const,
  list: (filters: FindTherapeuticCategoriesDto) =>
    [...THERAPEUTIC_CATEGORY_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...THERAPEUTIC_CATEGORY_QUERY_KEYS.all, id] as const,
}
