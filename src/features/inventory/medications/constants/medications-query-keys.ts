import type { FindMedicationsDto } from '../types/find-medications.dto'

export const MEDICATION_QUERY_KEYS = {
  all: ['medications'] as const,
  list: (filters: FindMedicationsDto) => [...MEDICATION_QUERY_KEYS.all, 'list', filters] as const,
  detail: (id: number) => [...MEDICATION_QUERY_KEYS.all, 'detail', id] as const,
  lots: (medicationId: number) => [...MEDICATION_QUERY_KEYS.all, 'lots', medicationId] as const,
  movements: (medicationId: number) => [...MEDICATION_QUERY_KEYS.all, 'movements', medicationId] as const,
}
