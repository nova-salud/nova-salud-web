import { ApiService } from '@/core/api/api.service'
import type { SSTDashboardResponse } from '../types/sst-dashboard-response'
import type { MedicalDashboardResponse } from '../types/medical-dashboard-response'
import type { ManagementDashboardResponse } from '../types/managment-dashboard-response'
import type { AdminDashboardResponse } from '../types/admin-dashboard-response'
import type { EmployeeDashboardResponse } from '../types/employee-dashboard-response'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'

class DashboardService extends ApiService {
  async getSSTDashboard(filters?: DateRange, eventType?: string): Promise<SSTDashboardResponse> {
    return await this.get<SSTDashboardResponse>('/dashboards/sst', {
      params: { ...filters, ...(eventType ? { eventType } : {}) },
    })
  }

  async getMedicalDashboard(filters?: DateRange): Promise<MedicalDashboardResponse> {
    return await this.get<MedicalDashboardResponse>('/dashboards/medical', { params: filters })
  }

  async getManagementDashboard(filters?: DateRange): Promise<ManagementDashboardResponse> {
    return await this.get<ManagementDashboardResponse>('/dashboards/management', { params: filters })
  }

  async getAdminDashboard(filters?: DateRange, eventType?: string): Promise<AdminDashboardResponse> {
    return await this.get<AdminDashboardResponse>('/dashboards/admin', {
      params: { ...filters, ...(eventType ? { eventType } : {}) },
    })
  }

  async getEmployeeDashboard(): Promise<EmployeeDashboardResponse> {
    return await this.get<EmployeeDashboardResponse>('/dashboards/employee')
  }
}

export const dashboardService = new DashboardService()
