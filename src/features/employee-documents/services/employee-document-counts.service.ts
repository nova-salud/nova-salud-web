import { ApiService } from '@/core/api/api.service'

export type EmployeeDocumentCountDto = {
  employeeId: number
  completedCyclesCount: number
  attentionsCount: number
  totalDocuments: number
}

class EmployeeDocumentCountsService extends ApiService {
  async getByEmployeeIds(employeeIds: number[]): Promise<EmployeeDocumentCountDto[]> {
    return this.get<EmployeeDocumentCountDto[]>('/events/document-counts', {
      params: { employeeIds },
    })
  }
}

export const employeeDocumentCountsService = new EmployeeDocumentCountsService()
