import type { FindUsersDto } from '../types'

export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  list: (filters: FindUsersDto) => [...USER_QUERY_KEYS.all, filters] as const,
}