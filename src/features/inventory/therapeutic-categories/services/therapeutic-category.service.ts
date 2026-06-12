import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { CreateTherapeuticCategoryDto } from '../types/create-therapeutic-category.dto'
import type { FindTherapeuticCategoriesDto } from '../types/find-therapeutic-categories.dto'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'
import type { UpdateTherapeuticCategoryDto } from '../types/update-therapeutic-category.dto'

class TherapeuticCategoryService extends ApiService {
  async findAll(
    query: FindTherapeuticCategoriesDto,
  ): Promise<PaginatedResponse<TherapeuticCategoryResponseDto>> {
    return await this.getPaginated<TherapeuticCategoryResponseDto>(
      '/inventory/therapeutic-categories',
      {
        params: query,
      },
    )
  }

  async findById(id: number): Promise<TherapeuticCategoryResponseDto> {
    return await this.get<TherapeuticCategoryResponseDto>(
      `/inventory/therapeutic-categories/${id}`,
    )
  }

  async create(dto: CreateTherapeuticCategoryDto): Promise<TherapeuticCategoryResponseDto> {
    return await this.post<TherapeuticCategoryResponseDto>('/inventory/therapeutic-categories', dto)
  }

  async update(id: number, dto: UpdateTherapeuticCategoryDto): Promise<TherapeuticCategoryResponseDto> {
    return await this.patch<TherapeuticCategoryResponseDto>(
      `/inventory/therapeutic-categories/${id}`,
      dto,
    )
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/inventory/therapeutic-categories/${id}`)
  }
}

export const therapeuticCategoryService = new TherapeuticCategoryService()