import type { UserRoleEnum } from './user-role.enum'

export type CreateUserDto = {
  username: string
  fullName: string
  password: string
  role: UserRoleEnum
}