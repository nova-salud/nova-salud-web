import { useQueryClient } from '@tanstack/react-query'
import { useAppQuery } from '@/shared/hooks'
import { NOTIFICATION_QUERY_KEYS } from '../constants/notification-query-keys'
import { notificationService } from '../services/notification.service'
import type { NotificationResponseDto } from '../types/notification-response.dto'

export const useNotifications = () => {
  const queryClient = useQueryClient()

  const { data, isFetching, error, refetch } = useAppQuery<NotificationResponseDto[]>({
    queryKey: NOTIFICATION_QUERY_KEYS.list(),
    queryFn: () => notificationService.findAll(),
  })

  const setData = (updater: (prev: NotificationResponseDto[]) => NotificationResponseDto[]) => {
    queryClient.setQueryData<NotificationResponseDto[]>(
      NOTIFICATION_QUERY_KEYS.list(),
      (prev) => updater(prev ?? []),
    )
  }

  return {
    data: data ?? [],
    setData,
    isLoading: isFetching,
    error: error?.message ?? null,
    refetch: async () => { await refetch() },
  }
}
