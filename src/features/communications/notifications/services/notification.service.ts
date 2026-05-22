import { ApiService } from '@/core/api/api.service'
import type { NotificationResponseDto } from '../types/notification-response.dto'

class NotificationService extends ApiService {
  async findAll(): Promise<NotificationResponseDto[]> {
    return await this.get<NotificationResponseDto[]>('/notifications')
  }
}

export const notificationService = new NotificationService()