import { keepPreviousData } from '@tanstack/react-query'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import type { AccidentResponseDto } from '../types'
import type { FindAccidentsDto } from '../types/find-accidents.dto'
import { accidentService } from '../services/accident.service'
import { ACCIDENT_QUERY_KEYS } from '../constants/accident-query-keys'

export const useAccidentsByClinicalHistory = (clinicalHistoryId: number) => {
  return usePaginatedQuery<AccidentResponseDto, FindAccidentsDto>({
    queryKey: ACCIDENT_QUERY_KEYS.list({ clinicalHistoryId }),
    queryFn: (filters) => accidentService.findAll({ ...filters, clinicalHistoryId }),
    placeholderData: keepPreviousData,
  })
}
