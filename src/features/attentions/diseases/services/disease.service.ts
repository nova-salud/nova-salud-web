import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type {
  CreateDiseaseDto,
  DiseaseResponseDto,
  FindDiseasesDto,
  UpdateDiseaseDto,
} from '../types'

class DiseaseService extends ApiService {
  async findAll(
    query: FindDiseasesDto,
  ): Promise<PaginatedResponse<DiseaseResponseDto>> {
    return await this.getPaginated<DiseaseResponseDto>(
      '/attentions/diseases',
      { params: query },
    )
  }

  async findById(id: number): Promise<DiseaseResponseDto> {
    return await this.get<DiseaseResponseDto>(`/attentions/diseases/${id}`)
  }

  async create(dto: CreateDiseaseDto): Promise<DiseaseResponseDto> {
    return await this.post<DiseaseResponseDto>('/attentions/diseases', dto)
  }

  async update(
    id: number,
    dto: UpdateDiseaseDto,
  ): Promise<DiseaseResponseDto> {
    return await this.patch<DiseaseResponseDto>(
      `/attentions/diseases/${id}`,
      dto,
    )
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/attentions/diseases/${id}`)
  }
}

export const diseaseService = new DiseaseService()