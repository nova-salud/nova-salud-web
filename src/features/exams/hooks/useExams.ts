import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import { EXAM_QUERY_KEYS } from '../constants/exam-query-keys'
import { examService } from '../services/exam.service'
import type { ExamResponseDto, FindExamsDto } from '../types'

type ExtraFilters = Omit<FindExamsDto, keyof QueryParams>

export const useExams = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedSearch = useDebounce(extraFilters.search, 450)

  const result = usePaginatedQuery<ExamResponseDto, FindExamsDto>({
    queryKey: EXAM_QUERY_KEYS.list({ ...extraFilters, search: debouncedSearch }),
    queryFn: (filters) => examService.findAll({
      ...filters,
      ...extraFilters,
      search: debouncedSearch || undefined,
      sortBy: 'name',
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
