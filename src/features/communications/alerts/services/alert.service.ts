import { ApiService } from '@/core/api/api.service'
import type { FindAlertsDto } from '../types/find-alerts.dto'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { AlertResponseDto } from '../types/alert-response.dto'

class AlertService extends ApiService {
  async findAll(params?: FindAlertsDto): Promise<PaginatedResponse<AlertResponseDto>> {
    return await this.get<PaginatedResponse<AlertResponseDto>>('/alerts', {
      params,
    })
  }

  async resolve(id: number): Promise<void> {
    await this.patch(`/alerts/${id}/resolve`)
  }
}

export const alertService = new AlertService()