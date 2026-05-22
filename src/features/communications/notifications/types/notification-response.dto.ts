import type { AlertMetadata } from '../../alerts/types/alert-metadata'
import { AlertPriority } from '../../alerts/types/alert-priority.enum'
import { AlertType } from '../../alerts/types/alert-type.enum'

export interface NotificationResponseDto {
  id: number
  isRead: boolean
  createdAt: string
  alertId: number
  alertType: AlertType
  alertPriority: AlertPriority
  alertTitle: string
  alertMessage: string
  employeeName: string | null
  employeeId: number | null
  metadata?: AlertMetadata | null
}