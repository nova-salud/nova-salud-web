import type { AlertMetadata } from './alert-metadata'
import type { AlertPriority } from './alert-priority.enum'
import type { AlertType } from './alert-type.enum'

export type AlertResponseDto = {
  id: number
  type: AlertType
  title: string
  message: string
  priority: AlertPriority
  isResolved: boolean
  employeeId: number | null
  employeeName: string | null
  metadata?: AlertMetadata | null
  createdAt: string
  resolvedAt?: string | null
}