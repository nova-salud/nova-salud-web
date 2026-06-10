import type { FindAccidentsDto } from '../types/find-accidents.dto'

export const ACCIDENT_QUERY_KEYS = {
  all: ['accidents'] as const,
  list: (filters: FindAccidentsDto) => [...ACCIDENT_QUERY_KEYS.all, filters],
  detail: (id: number) => [...ACCIDENT_QUERY_KEYS.all, id],
}
