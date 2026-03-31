export type FindInventoryMovementsDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  medicationId?: number
  medicationLotId?: number
  movementType?: string
  performedByUserId?: number
}