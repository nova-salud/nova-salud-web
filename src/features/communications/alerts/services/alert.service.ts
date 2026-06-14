import { ApiService } from '@/core/api/api.service'
import type { FindAlertsDto } from '../types/find-alerts.dto'
import type { AlertType } from '../types/alert-type.enum'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { AlertResponseDto } from '../types/alert-response.dto'

class AlertService extends ApiService {
  async findAll(params?: FindAlertsDto): Promise<PaginatedResponse<AlertResponseDto>> {
    return await this.get<PaginatedResponse<AlertResponseDto>>('/alerts', {
      params,
    })
  }

  async getSummary(params?: FindAlertsDto): Promise<{ high: number; medium: number; low: number }> {
    return await this.get<{ high: number; medium: number; low: number }>('/alerts/summary', { params })
  }

  async getUnresolvedCount(types?: AlertType[]): Promise<{ count: number }> {
    return await this.get<{ count: number }>('/alerts/count', {
      params: types?.length ? { types } : undefined,
    })
  }

  async resolve(id: number): Promise<void> {
    await this.patch(`/alerts/${id}/resolve`)
  }
}

export const alertService = new AlertService()