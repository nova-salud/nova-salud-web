export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export type SortOrder = typeof SortOrder[keyof typeof SortOrder]

export type QueryParams = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: SortOrder
}