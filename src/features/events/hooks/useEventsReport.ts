import { keepPreviousData } from '@tanstack/react-query'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useUrlFilters } from '@/shared/hooks/useUrlFilters'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { eventsReportService } from '../services/events-report.service'
import type { EventReportItemDto, EventReportTypeFilter, FindEventsReportParams } from '../types/event-report.types'

type EventFilters = {
  type?: EventReportTypeFilter
  employeeFullName?: string
  dateFrom?: string
  dateTo?: string
}

export const useEventsReport = () => {
  const { filters, setFilters } = useUrlFilters<EventFilters>()
  const debouncedName = useDebounce(filters.employeeFullName, 400)

  const result = usePaginatedQuery<EventReportItemDto, FindEventsReportParams>({
    queryKey: ['events-report', filters],
    queryFn: (paginationParams) => eventsReportService.findAll({
      ...paginationParams,
      ...filters,
      employeeFullName: debouncedName,
    }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (newFilters: Partial<EventFilters>) => {
    setFilters(newFilters)
    result.goToPage(1)
  }

  return { ...result, filters, onChangeFilters }
}
