import type { FindDiseasesDto } from '../types'

export const DISEASE_QUERY_KEYS = {
  all: ['diseases'] as const,
  list: (filters: FindDiseasesDto) => [...DISEASE_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...DISEASE_QUERY_KEYS.all, id] as const,
}
