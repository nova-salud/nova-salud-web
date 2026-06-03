import type { RoleEnum } from '@/core/enums/role.enum'
import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'

export type UserResponseDto = AuditResponseDto & {
  id: number
  username: string
  role: RoleEnum
  isActive: boolean
  isBlocked: boolean
  employee: EmployeeResponseDto | null
}
