import { createContext } from 'react'
import type { NotificationResponseDto } from '../types/notification-response.dto'

export interface NotificationsContextValue {
  data: NotificationResponseDto[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  markAsRead: (id: number) => Promise<void>
}

export const NotificationsContext = createContext<NotificationsContextValue | null>(null)
