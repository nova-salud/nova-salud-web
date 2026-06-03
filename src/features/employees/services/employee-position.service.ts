import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindEmployeePositionsDto } from '../types/find-employee-positions.dto'
import type { EmployeePositionResponseDto } from '../types/employee-position-response.dto'

class EmployeePositionService extends ApiService {
  async findAll(
    query: FindEmployeePositionsDto,
  ): Promise<PaginatedResponse<EmployeePositionResponseDto>> {
    return await this.getPaginated<EmployeePositionResponseDto>(
      '/employees/positions',
      { params: query },
    )
  }

  async findById(id: number): Promise<EmployeePositionResponseDto> {
    return await this.get<EmployeePositionResponseDto>(`/employees/positions/${id}`)
  }
}

export const employeePositionService = new EmployeePositionService()
