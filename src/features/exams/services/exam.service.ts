
import { ApiService } from '@/core/api/api.service'
import type {
  CreateExamDto,
  ExamResponseDto,
  FindExamsDto,
  UpdateExamDto,
} from '../types'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'

class ExamService extends ApiService {
  async findAll(params: FindExamsDto): Promise<PaginatedResponse<ExamResponseDto>> {
    return await this.get<PaginatedResponse<ExamResponseDto>>(
      '/exams',
      { params },
    )
  }

  async findById(id: number): Promise<ExamResponseDto> {
    return await this.get<ExamResponseDto>(`/exams/${id}`)
  }

  async create(dto: CreateExamDto): Promise<ExamResponseDto> {
    return await this.post<ExamResponseDto>('/exams', dto)
  }

  async update(id: number, dto: UpdateExamDto): Promise<ExamResponseDto> {
    return await this.patch<ExamResponseDto>(`/exams/${id}`, dto)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/exams/${id}`)
  }
}

export const examService = new ExamService()