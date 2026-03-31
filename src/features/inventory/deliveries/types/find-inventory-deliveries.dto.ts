export type FindInventoryDeliveriesDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  status?: string
  deliveredByUserId?: number
  receivedByUserId?: number
}