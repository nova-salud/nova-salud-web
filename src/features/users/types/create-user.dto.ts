import type { RoleEnum } from '@/core/enums/role.enum'

export type CreateUserDto = {
  username: string
  password: string
  role: RoleEnum
  isActive?: boolean
  isBlocked?: boolean
}
