import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmployeeSyncJobSettingResponseDto = AuditResponseDto & {
  id: number
  isEnabled: boolean
  intervalMinutes: number
  lastExecutedAt: string | null
}