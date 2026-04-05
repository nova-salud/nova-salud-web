import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindEmployeeAreasDto } from '../types/find-employee-areas.dto'
import type { EmployeeAreaResponseDto } from '../types/employee-area-response.dto'

class EmployeeAreaService extends ApiService {
  async findAll(
    query: FindEmployeeAreasDto,
  ): Promise<PaginatedResponse<EmployeeAreaResponseDto>> {
    return await this.getPaginated<EmployeeAreaResponseDto>(
      '/employees/areas',
      { params: query },
    )
  }

  async findById(id: number): Promise<EmployeeAreaResponseDto> {
    return await this.get<EmployeeAreaResponseDto>(`/employees/areas/${id}`)
  }
}

export const employeeAreaService = new EmployeeAreaService()