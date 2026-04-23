import type { RoleEnum } from '@/core/enums/role.enum'

export type UpdateUserDto = {
  username?: string
  fullName?: string
  role?: RoleEnum
  isActive?: boolean
  dni?: string
  area?: string | null
  position?: string | null
  isExternal?: boolean
  company?: string | null
  isBlocked?: boolean
}