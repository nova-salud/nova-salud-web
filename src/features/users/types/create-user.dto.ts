import type { RoleEnum } from '@/core/enums/role.enum'

export type CreateUserDto = {
  username: string
  fullName: string
  password: string
  role: RoleEnum
  dni: string
  area: string | null
  position: string | null
  isExternal: boolean
  company: string | null
}