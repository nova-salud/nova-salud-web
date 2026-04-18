import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type {
  ClinicalHistoryFullResponseDto,
  ClinicalHistoryResponseDto,
  CreateClinicalHistoryDto,
  FindClinicalHistoriesDto,
  UpdateClinicalHistoryDto,
} from '../types'

class ClinicalHistoryService extends ApiService {
  async findAll(
    query: FindClinicalHistoriesDto,
  ): Promise<PaginatedResponse<ClinicalHistoryResponseDto>> {
    return await this.getPaginated<ClinicalHistoryResponseDto>(
      '/attentions/clinical-histories',
      { params: query },
    )
  }

  async findByEmployeeId(employeeId: number): Promise<ClinicalHistoryResponseDto> {
    return await this.get<ClinicalHistoryResponseDto>(
      `/attentions/clinical-histories/employee/${employeeId}`,
    )
  }

  async findFullByEmployeeId(
    employeeId: number,
  ): Promise<ClinicalHistoryFullResponseDto> {
    return await this.get<ClinicalHistoryFullResponseDto>(
      `/attentions/clinical-histories/employee/${employeeId}/full`,
    )
  }

  async create(
    dto: CreateClinicalHistoryDto,
  ): Promise<ClinicalHistoryResponseDto> {
    return await this.post<ClinicalHistoryResponseDto>(
      '/attentions/clinical-histories',
      dto,
    )
  }

  async update(
    id: number,
    dto: UpdateClinicalHistoryDto,
  ): Promise<ClinicalHistoryResponseDto> {
    return await this.patch<ClinicalHistoryResponseDto>(
      `/attentions/clinical-histories/${id}`,
      dto,
    )
  }
}

export const clinicalHistoryService = new ClinicalHistoryService()