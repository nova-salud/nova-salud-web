import type { QueryParams } from '@/core/types/query-params.type'
import type { UserRoleEnum } from './user-role.enum'

export type FindUsersDto = QueryParams & {
  username?: string
  role?: UserRoleEnum
  isActive?: boolean
}