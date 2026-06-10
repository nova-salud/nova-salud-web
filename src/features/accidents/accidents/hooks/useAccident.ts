import { useAppQuery } from '@/shared/hooks'
import { ACCIDENT_QUERY_KEYS } from '../constants/accident-query-keys'
import { accidentService } from '../services/accident.service'

export const useAccident = (id: number) => {
  return useAppQuery({
    queryKey: ACCIDENT_QUERY_KEYS.detail(id),
    queryFn: () => accidentService.findById(id),
    enabled: !!id,
  })
}
