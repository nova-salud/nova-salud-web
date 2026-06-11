import type { FindAllergyTypesDto } from '../types'

export const ALLERGY_TYPE_QUERY_KEYS = {
  all: ['allergy-types'] as const,
  list: (filters: FindAllergyTypesDto) => [...ALLERGY_TYPE_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...ALLERGY_TYPE_QUERY_KEYS.all, id] as const,
}
