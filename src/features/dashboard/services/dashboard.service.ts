import { ApiService } from '@/core/api/api.service'
import type { SSTDashboardResponse } from '../types/sst-dashboard-response'
import type { MedicalDashboardResponse } from '../types/medical-dashboard-response'
import type { ManagementDashboardResponse } from '../types/managment-dashboard-response'
import type { AdminDashboardResponse } from '../types/admin-dashboard-response'

class DashboardService extends ApiService {
  async getSSTDashboard(): Promise<SSTDashboardResponse> {
    return await this.get<SSTDashboardResponse>('/dashboards/sst')
  }

  async getMedicalDashboard(): Promise<MedicalDashboardResponse> {
    return await this.get<MedicalDashboardResponse>('/dashboards/medical')
  }

  async getManagementDashboard(): Promise<ManagementDashboardResponse> {
    return await this.get<ManagementDashboardResponse>('/dashboards/management')
  }

  async getAdminDashboard(): Promise<AdminDashboardResponse> {
    return await this.get<AdminDashboardResponse>('/dashboards/admin')
  }
}

export const dashboardService = new DashboardService()