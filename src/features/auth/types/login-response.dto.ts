export type LoginResponseDto = {
  tokens: {
    accessToken: string
  }
  authenticatedUser: {
    id: number
    username: string
    active: boolean
  }
}