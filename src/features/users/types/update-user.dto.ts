import type { UserRoleEnum } from './user-role.enum'

export type UpdateUserDto = {
  username?: string
  fullName?: string
  role?: UserRoleEnum
  isActive?: boolean
}