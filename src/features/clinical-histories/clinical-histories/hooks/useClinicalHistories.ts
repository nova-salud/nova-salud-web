import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import type { QueryParams } from '@/core/types/query-params.type'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useDebounce } from '@/shared/hooks'
import type { ClinicalHistoryListItemDto, FindClinicalHistoriesDto } from '../types'
import { clinicalHistoryService } from '../services/clinical-history.service'
import { CLINICAL_HISTORY_QUERY_KEYS } from '../constants/clinical-history-query-keys'

type ExtraFilters = Omit<FindClinicalHistoriesDto, keyof QueryParams>

const DEFAULT_DELAY = 450

export const useClinicalHistories = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})

  const debouncedFullName = useDebounce(extraFilters.fullName, DEFAULT_DELAY)
  const debouncedDni = useDebounce(extraFilters.dni, DEFAULT_DELAY)

  const result = usePaginatedQuery<ClinicalHistoryListItemDto, FindClinicalHistoriesDto>({
    queryKey: CLINICAL_HISTORY_QUERY_KEYS.list({ ...extraFilters, fullName: debouncedFullName, dni: debouncedDni }),
    queryFn: (filters) => clinicalHistoryService.findAll({
      ...filters,
      ...extraFilters,
      fullName: debouncedFullName || undefined,
      dni: debouncedDni || undefined,
    }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return {
    ...result,
    onChangeFilters,
  }
}
