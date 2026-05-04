import type { AlertPriority } from './alert-priority.enum'
import type { AlertType } from './alert-type.enum'

export type AlertResponseDto = {
  id: number
  type: AlertType
  title: string
  message: string
  priority: AlertPriority
  isResolved: boolean
  metadata?: Record<string, unknown> | null
  createdAt: string
  resolvedAt?: string | null
}