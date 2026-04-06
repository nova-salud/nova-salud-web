import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmployeeSyncConnectionSettingResponseDto = AuditResponseDto & {
  id: number
  host: string
  port: number
  username: string
  database: string
  encrypt: boolean
  trustServerCertificate: boolean
  lastTestedAt: string | null
  lastTestSuccess: boolean | null
}