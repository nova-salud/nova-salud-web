import { ApiService } from '@/core/api/api.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { ConfirmInventoryRequirementDto } from '../types/confirm-inventory-requirement.dto'
import type { CreateInventoryRequirementDto } from '../types/create-inventory-requirement.dto'
import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'
import type { MarkRequirementDeliveredDto } from '../types/mark-requirement-delivered.dto'

class RequirementService extends ApiService {
  async findAll(
    query: FindInventoryRequirementsDto,
  ): Promise<PaginatedResponse<InventoryRequirementResponseDto>> {
    return await this.getPaginated<InventoryRequirementResponseDto>(
      '/inventory/requirements',
      { params: query },
    )
  }

  async findById(id: number): Promise<InventoryRequirementResponseDto> {
    return await this.get<InventoryRequirementResponseDto>(
      `/inventory/requirements/${id}`,
    )
  }

  async create(dto: CreateInventoryRequirementDto): Promise<InventoryRequirementResponseDto> {
    return await this.post<InventoryRequirementResponseDto, CreateInventoryRequirementDto>(
      '/inventory/requirements',
      dto,
    )
  }

  async markDelivered(
    id: number,
    dto: MarkRequirementDeliveredDto,
  ): Promise<InventoryRequirementResponseDto> {
    return await this.patch<InventoryRequirementResponseDto, MarkRequirementDeliveredDto>(
      `/inventory/requirements/${id}/deliver`,
      dto,
    )
  }

  async confirm(
    id: number,
    dto: ConfirmInventoryRequirementDto,
  ): Promise<InventoryRequirementResponseDto> {
    return await this.patch<InventoryRequirementResponseDto, ConfirmInventoryRequirementDto>(
      `/inventory/requirements/${id}/confirm`,
      dto,
    )
  }
}

export const requirementService = new RequirementService()