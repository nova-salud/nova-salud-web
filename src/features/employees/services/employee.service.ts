import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindEmployeesDto } from '../types/find-employees.dto'
import type { EmployeeResponseDto } from '../types/employee-response.dto'
import type { ImportEmployeesResultDto } from '../types/import-employees-result.dto'

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

  async findByDni(dni: string): Promise<EmployeeResponseDto> {
    return await this.get<EmployeeResponseDto>(`/employees/dni/${dni}`)
  }

  async importCsv(file: File): Promise<ImportEmployeesResultDto> {
    const formData = new FormData()
    formData.append('file', file)

    return await this.post<ImportEmployeesResultDto>(
      '/employees/import',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    )
  }
}

export const employeeService = new EmployeeService()