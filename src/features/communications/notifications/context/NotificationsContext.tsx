import type { PropsWithChildren } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import { notificationService } from '../services/notification.service'
import type { NotificationResponseDto } from '../types/notification-response.dto'
import { NotificationsContext } from './notifications-context'

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
  const { data, setData, error, refetch, ...rest } = useNotifications()

  const errorMessage = error?.message
  const handleRefetch = async () => { await refetch() }

  const markAsRead = async (id: number) => {
    const target = data.find(n => n.id === id)
    if (!target || target.isRead) return

    setData(prev => prev.map((n: NotificationResponseDto) => n.id === id ? { ...n, isRead: true } : n))

    try {
      await notificationService.markAsRead(id)
    } catch {
      setData(prev => prev.map((n: NotificationResponseDto) => n.id === id ? { ...n, isRead: false } : n))
    }
  }

  return (
    <NotificationsContext.Provider value={{ data, ...rest, error: errorMessage, refetch: handleRefetch, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  )
}
