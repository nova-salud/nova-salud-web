import { useState } from 'react'
import type { QueryParams } from '@/core/types/query-params.type'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import { MOVEMENT_QUERY_KEYS } from '../constants/movements-query-keys'
import { movementService } from '../services/movement.service'
import { keepPreviousData } from '@tanstack/react-query'
import type { FindInventoryMovementsDto, InventoryMovementResponseDto } from '../types'

type ExtraFilters = Omit<FindInventoryMovementsDto, keyof QueryParams>

export const useMovements = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedUsername = useDebounce(extraFilters.performedByUserName, 450)

  const result = usePaginatedQuery<InventoryMovementResponseDto, FindInventoryMovementsDto>({
    queryKey: MOVEMENT_QUERY_KEYS.list({ ...extraFilters, performedByUserName: debouncedUsername }),
    queryFn: (filters) => movementService.findAll({
      ...filters,
      ...extraFilters,
      performedByUserName: debouncedUsername || undefined,
    }),
    placeholderData: keepPreviousData
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return {
    ...result,
    onChangeFilters,
    extraFilters
  }
}