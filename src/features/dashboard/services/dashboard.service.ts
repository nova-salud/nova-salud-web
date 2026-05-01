import { ApiService } from '@/core/api/api.service'
import type { SSTDashboardResponse } from '../types/sst-dashboard-response'

class DashboardService extends ApiService {
  async getSSTDashboard(): Promise<SSTDashboardResponse> {
    return await this.get<SSTDashboardResponse>('/dashboards/sst')
  }

}

export const dashboardService = new DashboardService()