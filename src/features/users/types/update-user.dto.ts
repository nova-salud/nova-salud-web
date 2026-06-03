import type { RoleEnum } from '@/core/enums/role.enum'

export type UpdateUserDto = {
  username?: string
  role?: RoleEnum
  isActive?: boolean
  isBlocked?: boolean
}
