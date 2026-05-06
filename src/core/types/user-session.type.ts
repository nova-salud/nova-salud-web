import type { RoleEnum } from '@/core/enums/role.enum'

export type UserSession = {
  token: string
  user: {
    id: number
    username: string
    fullname: string
    active: boolean
    role: RoleEnum
  }
}