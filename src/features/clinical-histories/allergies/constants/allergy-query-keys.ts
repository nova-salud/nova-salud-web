export const ALLERGY_QUERY_KEYS = {
  all: ['allergies'] as const,
  byClinicalHistory: (clinicalHistoryId: number) => [...ALLERGY_QUERY_KEYS.all, clinicalHistoryId] as const,
}
