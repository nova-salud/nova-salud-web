import { SortOrder } from '@/core/types/query-params.type'
import { examService } from '@/features/exams/services/exam.service'
import type { FindExamsDto } from '@/features/exams/types'
import { useAppQuery } from '@/shared/hooks'

export const useSearchExams = () => {
  const examsQuery: FindExamsDto = {
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }

  const result = useAppQuery({
    queryKey: ['search-exams', examsQuery],
    queryFn: () => examService.findAll(examsQuery)
  })


  return {
    exams: result.data?.data ?? []
  }
}