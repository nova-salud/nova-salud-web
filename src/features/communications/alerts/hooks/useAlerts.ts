import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery, useAppQuery } from '@/shared/hooks'
import { useAuth } from '@/shared/hooks/useAuth'
import type { QueryParams } from '@/core/types/query-params.type'
import { ALERT_QUERY_KEYS } from '../constants/alert-query-keys'
import { alertService } from '../services/alert.service'
import type { AlertResponseDto } from '../types/alert-response.dto'
import type { FindAlertsDto } from '../types/find-alerts.dto'
import { getTypesForRole } from '../config/alert-role-config'

type ExtraFilters = Omit<FindAlertsDto, keyof QueryParams | 'types'>

const EMPTY_SUMMARY = { high: 0, medium: 0, low: 0 }

export const useAlerts = () => {
  const { user } = useAuth()
  const roleTypes = user ? getTypesForRole(user.role) : undefined
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({ isResolved: false })
  const debouncedTitle = useDebounce(extraFilters.title, 450)
  const debouncedEmployeeName = useDebounce(extraFilters.employeeName, 450)

  const activeFilters: FindAlertsDto = {
    ...extraFilters,
    title: debouncedTitle || undefined,
    employeeName: debouncedEmployeeName || undefined,
    types: roleTypes,
  }

  const result = usePaginatedQuery<AlertResponseDto, FindAlertsDto>({
    queryKey: ALERT_QUERY_KEYS.list(activeFilters),
    queryFn: (filters) => alertService.findAll({ ...filters, ...activeFilters }),
    defaultPageSize: 10,
    placeholderData: keepPreviousData,
  })

  const { data: summaryData } = useAppQuery({
    queryKey: ALERT_QUERY_KEYS.summary(activeFilters),
    queryFn: () => alertService.getSummary(activeFilters),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return {
    ...result,
    summary: summaryData ?? EMPTY_SUMMARY,
    onChangeFilters,
  }
}
