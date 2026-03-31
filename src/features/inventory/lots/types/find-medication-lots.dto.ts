export type FindMedicationLotsDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  medicationId?: number
}