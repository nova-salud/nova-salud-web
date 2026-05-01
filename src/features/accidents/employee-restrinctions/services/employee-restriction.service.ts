import { ApiService } from '@/core/api/api.service'
import type { CreateEmployeeRestrictionDto } from '../types/create-employee-restriction.dto'
import type { EmployeeRestrictionResponseDto } from '../types/employee-restriction-response.dto'

class EmployeeRestrictionService extends ApiService {
  async create(dto: CreateEmployeeRestrictionDto) {
    return await this.post<EmployeeRestrictionResponseDto>(
      '/employee-restrictions',
      dto,
    )
  }

  async lift(id: number) {
    return await this.patch<void>(
      `/employee-restrictions/${id}/lift`,
    )
  }
}

export const employeeRestrictionService = new EmployeeRestrictionService()