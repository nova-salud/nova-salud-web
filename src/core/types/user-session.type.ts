import type { RoleEnum } from '@/core/enums/role.enum'

export type UserSession = {
  token: string
  user: {
    id: number
    username: string
    active: boolean
    role?: RoleEnum
  }
}