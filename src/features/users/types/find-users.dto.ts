import type { RoleEnum } from '@/core/enums/role.enum'
import type { QueryParams } from '@/core/types/query-params.type'

export type FindUsersDto = QueryParams & {
  username?: string
  role?: RoleEnum
  isActive?: boolean
}