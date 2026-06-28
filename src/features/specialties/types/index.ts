import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { QueryParams } from '@/core/types/query-params.type'

export type SpecialtyResponseDto = AuditResponseDto & {
  id: number
  name: string
  isActive: boolean
}

export type CreateSpecialtyDto = {
  name: string
  isActive?: boolean
}

export type UpdateSpecialtyDto = Partial<CreateSpecialtyDto>

export type FindSpecialtiesDto = QueryParams & {
  name?: string
  isActive?: boolean
}
