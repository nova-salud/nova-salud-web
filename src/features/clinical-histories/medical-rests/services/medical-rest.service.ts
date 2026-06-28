import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { QueryParams } from '@/core/types/query-params.type'
import type { CreateMedicalRestDto, MedicalRestResponseDto } from '../types'

export type FindMedicalRestsParams = QueryParams & {
  clinicalHistoryId?: number
  accidentId?: number
  attentionId?: number
  employeeFullName?: string
  startDateFrom?: string
  startDateTo?: string
}

class MedicalRestService extends ApiService {
  async create(dto: CreateMedicalRestDto, file?: File): Promise<MedicalRestResponseDto> {
    const formData = new FormData()
    formData.append('clinicalHistoryId', String(dto.clinicalHistoryId))
    formData.append('startDate', dto.startDate)
    formData.append('endDate', dto.endDate)
    if (dto.accidentId) formData.append('accidentId', String(dto.accidentId))
    if (dto.attentionId) formData.append('attentionId', String(dto.attentionId))
    if (dto.specialtyId) formData.append('specialtyId', String(dto.specialtyId))
    formData.append('diagnosis', dto.diagnosis)
    formData.append('type', dto.type)
    formData.append('contingency', dto.contingency)
    if (dto.notes) formData.append('notes', dto.notes)
    if (file) formData.append('file', file)

    return await this.post<MedicalRestResponseDto>(
      '/clinical-histories/medical-rests',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
  }

  async findAll(params?: FindMedicalRestsParams): Promise<PaginatedResponse<MedicalRestResponseDto>> {
    return await this.get<PaginatedResponse<MedicalRestResponseDto>>(
      '/clinical-histories/medical-rests',
      { params },
    )
  }

  async findById(id: number): Promise<MedicalRestResponseDto> {
    return await this.get<MedicalRestResponseDto>(`/clinical-histories/medical-rests/${id}`)
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/clinical-histories/medical-rests/${id}`)
  }
}

export const medicalRestService = new MedicalRestService()
