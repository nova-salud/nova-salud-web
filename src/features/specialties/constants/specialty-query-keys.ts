import type { FindSpecialtiesDto } from '../types'

export const SPECIALTY_QUERY_KEYS = {
  all: ['specialties'] as const,
  list: (filters?: FindSpecialtiesDto) => [...SPECIALTY_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...SPECIALTY_QUERY_KEYS.all, id] as const,
}
