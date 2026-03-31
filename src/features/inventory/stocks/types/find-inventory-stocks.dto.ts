export type FindInventoryStocksDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  commercialName?: string
  genericName?: string
  therapeuticCategoryId?: number
  isOtc?: boolean
  isActive?: boolean
}