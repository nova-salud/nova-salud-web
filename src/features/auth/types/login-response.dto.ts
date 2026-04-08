import type { UserRoleEnum } from '@/features/users/types'

export type LoginResponseDto = {
  tokens: {
    accessToken: string
  }
  authenticatedUser: {
    id: number
    username: string
    active: boolean
    role: UserRoleEnum
  }
}