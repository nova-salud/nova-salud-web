import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { UserRoleEnum } from './user-role.enum'

export type UserResponseDto = AuditResponseDto & {
  id: number
  username: string
  fullName: string
  role: UserRoleEnum
  isActive: boolean
}