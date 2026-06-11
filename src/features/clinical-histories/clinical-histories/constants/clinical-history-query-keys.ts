import type { FindClinicalHistoriesDto } from '../types'

export const CLINICAL_HISTORY_QUERY_KEYS = {
  all: ['clinical-histories'] as const,
  list: (filters: FindClinicalHistoriesDto) => [...CLINICAL_HISTORY_QUERY_KEYS.all, filters],
  detail: (employeeId: number) => [...CLINICAL_HISTORY_QUERY_KEYS.all, 'detail', employeeId] as const,
}
