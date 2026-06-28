import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { EventReportItemDto, FindEventsReportParams } from '../types/event-report.types'

class EventsReportService extends ApiService {
  async findAll(params?: FindEventsReportParams): Promise<PaginatedResponse<EventReportItemDto>> {
    return await this.get<PaginatedResponse<EventReportItemDto>>('/events/report', { params })
  }
}

export const eventsReportService = new EventsReportService()
