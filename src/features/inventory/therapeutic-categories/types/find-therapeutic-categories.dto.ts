export type FindTherapeuticCategoriesDto = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  name?: string
  isActive?: boolean
}