import type { FindHealthcareCentersDto } from '../types'

export const HEALTHCARE_CENTER_QUERY_KEYS = {
  all: ['health-centers'] as const,
  list: (filters: FindHealthcareCentersDto) => [...HEALTHCARE_CENTER_QUERY_KEYS.all, filters],
  detail: (id: number) => [...HEALTHCARE_CENTER_QUERY_KEYS.all, id]
}