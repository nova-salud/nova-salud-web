import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import { REQUIREMENT_QUERY_KEYS } from '../constants/requirements-query-keys'
import { requirementService } from '../services/requirement.service'
import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'
import type { InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

export type ExtraFilters = Omit<FindInventoryRequirementsDto, keyof QueryParams>

export const useRequirements = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedRequestCode = useDebounce(extraFilters.requestCode, 450)
  const debouncedRequestedByUserName = useDebounce(extraFilters.requestedByUserName, 450)
  const debouncedDeliveredByUserName = useDebounce(extraFilters.deliveredByUserName, 450)

  const result = usePaginatedQuery<InventoryRequirementResponseDto, FindInventoryRequirementsDto>({
    queryKey: REQUIREMENT_QUERY_KEYS.list({
      ...extraFilters,
      requestCode: debouncedRequestCode,
      requestedByUserName: debouncedRequestedByUserName,
      deliveredByUserName: debouncedDeliveredByUserName,
    }),
    queryFn: (filters) => requirementService.findAll({
      ...filters,
      ...extraFilters,
      requestCode: debouncedRequestCode || undefined,
      requestedByUserName: debouncedRequestedByUserName || undefined,
      deliveredByUserName: debouncedDeliveredByUserName || undefined,
    }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters((prev) => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return { ...result, onChangeFilters, extraFilters }
}
