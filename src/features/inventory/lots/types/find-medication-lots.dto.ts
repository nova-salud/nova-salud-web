import type { QueryParams } from '@/core/types/query-params.type'

export type FindMedicationLotsDto = QueryParams & {
  medicationId?: number
}