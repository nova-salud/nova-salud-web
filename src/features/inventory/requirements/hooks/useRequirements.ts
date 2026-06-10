import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks'
import { REQUIREMENT_QUERY_KEYS } from '../constants/requirements-query-keys'
import { requirementService } from '../services/requirement.service'
import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

export type ExtraFilters = Omit<FindInventoryRequirementsDto, keyof QueryParams>

export const useRequirements = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})

  const result = usePaginatedQuery<InventoryRequirementResponseDto, FindInventoryRequirementsDto>({
    queryKey: REQUIREMENT_QUERY_KEYS.list({ ...extraFilters }),
    queryFn: (filters) => requirementService.findAll({ ...filters, ...extraFilters }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters((prev) => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return { ...result, onChangeFilters, extraFilters }
}
