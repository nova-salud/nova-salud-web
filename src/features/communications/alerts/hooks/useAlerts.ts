import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import { ALERT_QUERY_KEYS } from '../constants/alert-query-keys'
import { alertService } from '../services/alert.service'
import type { AlertResponseDto } from '../types/alert-response.dto'
import type { FindAlertsDto } from '../types/find-alerts.dto'

type ExtraFilters = Omit<FindAlertsDto, keyof QueryParams>

export const useAlerts = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({ isResolved: false })
  const debouncedTitle = useDebounce(extraFilters.title, 450)
  const debouncedEmployeeName = useDebounce(extraFilters.employeeName, 450)

  const result = usePaginatedQuery<AlertResponseDto, FindAlertsDto>({
    queryKey: ALERT_QUERY_KEYS.list({ ...extraFilters, title: debouncedTitle, employeeName: debouncedEmployeeName }),
    queryFn: (filters) => alertService.findAll({
      ...filters,
      ...extraFilters,
      title: debouncedTitle || undefined,
      employeeName: debouncedEmployeeName || undefined,
    }),
    defaultPageSize: 10,
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
