import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { examService } from '../services/exam.service'
import type { FindExamsDto } from '../types'

export const useExams = (query: FindExamsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => examService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
