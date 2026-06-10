import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import { stockService } from '../../stocks/services/stock.service'
import { MEDICATION_QUERY_KEYS } from '../constants/medications-query-keys'
import type { FindMedicationsDto } from '../types/find-medications.dto'
import type { InventoryStockResponseDto } from '../../stocks/types/inventory-stock-response.dto'

type ExtraFilters = Omit<FindMedicationsDto, keyof QueryParams>

export const useMedications = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedCommercialName = useDebounce(extraFilters.commercialName, 450)

  const result = usePaginatedQuery<InventoryStockResponseDto, FindMedicationsDto>({
    queryKey: MEDICATION_QUERY_KEYS.list({ ...extraFilters, commercialName: debouncedCommercialName }),
    queryFn: (filters) =>
      stockService.findAll({
        ...filters,
        ...extraFilters,
        commercialName: debouncedCommercialName || undefined,
      }),
    defaultSortBy: 'commercialName',
    defaultSortOrder: 'ASC',
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters((prev) => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return { ...result, onChangeFilters, extraFilters }
}
