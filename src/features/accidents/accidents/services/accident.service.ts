import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { AccidentResponseDto, CreateAccidentDto, UpdateAccidentDto } from '../types'
import type { FindAccidentsDto } from '../types/find-accidents.dto'

class AccidentService extends ApiService {
  async findAll(params?: FindAccidentsDto) {
    return await this.get<PaginatedResponse<AccidentResponseDto>>('/accidents', { params })
  }

  async findById(id: number) {
    return await this.get<AccidentResponseDto>(`/accidents/${id}`)
  }

  async create(dto: CreateAccidentDto) {
    return await this.post<AccidentResponseDto>('/accidents', dto)
  }

  async update(id: number, dto: UpdateAccidentDto) {
    return await this.patch<AccidentResponseDto>(`/accidents/${id}`, dto)
  }
}

export const accidentService = new AccidentService()