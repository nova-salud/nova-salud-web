import type { RoleEnum } from '@/core/enums/role.enum'

export type LoginResponseDto = {
  tokens: {
    accessToken: string
  }
  authenticatedUser: {
    id: number
    username: string
    active: boolean
    role: RoleEnum
  }
}