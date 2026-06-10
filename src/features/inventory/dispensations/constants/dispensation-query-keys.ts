import type { FindDispensationsDto } from '../types'

export const DISPENSATION_QUERY_KEYS = {
  all: ['dispensations'] as const,
  list: (filters: FindDispensationsDto) => [...DISPENSATION_QUERY_KEYS.all, filters],
  detail: (id: number) => [...DISPENSATION_QUERY_KEYS.all, id]
}