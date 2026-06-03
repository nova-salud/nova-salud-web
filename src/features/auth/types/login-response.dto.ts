import type { UserResponseDto } from '@/features/users/types/user-response.dto'

export type LoginResponseDto = {
  tokens: {
    accessToken: string
  }
  authenticatedUser: UserResponseDto
}
