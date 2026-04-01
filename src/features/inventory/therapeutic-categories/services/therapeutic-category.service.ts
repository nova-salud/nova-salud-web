import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { FindTherapeuticCategoriesDto } from '../types/find-therapeutic-categories.dto'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'

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
}

export const therapeuticCategoryService = new TherapeuticCategoryService()