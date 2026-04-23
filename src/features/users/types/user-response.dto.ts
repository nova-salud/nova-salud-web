import type { RoleEnum } from '@/core/enums/role.enum'
import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type UserResponseDto = AuditResponseDto & {
  id: number
  username: string
  fullName: string
  role: RoleEnum
  isActive: boolean
  dni: string
  area: string | null
  position: string | null
  isExternal: boolean
  company: string
  isBlocked: boolean
}