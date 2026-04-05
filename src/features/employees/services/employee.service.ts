import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindEmployeesDto } from '../types/find-employees.dto'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

class EmployeeService extends ApiService {
  async findAll(
    query: FindEmployeesDto,
  ): Promise<PaginatedResponse<EmployeeResponseDto>> {
    return await this.getPaginated<EmployeeResponseDto>(
      '/employees',
      { params: query },
    )
  }

  async findById(id: number): Promise<EmployeeResponseDto> {
    return await this.get<EmployeeResponseDto>(`/employees/${id}`)
  }
}

export const employeeService = new EmployeeService()