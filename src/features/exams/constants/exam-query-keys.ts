import type { FindExamsDto } from '../types'

export const EXAM_QUERY_KEYS = {
  all: ['exams'] as const,
  list: (filters: FindExamsDto) => [...EXAM_QUERY_KEYS.all, filters] as const,
  detail: (id: number) => [...EXAM_QUERY_KEYS.all, id] as const,
}
