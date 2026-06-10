import { useAppQuery } from '@/shared/hooks'
import { requirementService } from '../services/requirement.service'
import { REQUIREMENT_QUERY_KEYS } from '../constants/requirements-query-keys'

export const useRequirement = (id: number) => {
  return useAppQuery({
    queryKey: REQUIREMENT_QUERY_KEYS.detail(id),
    queryFn: () => requirementService.findById(id),
    enabled: !Number.isNaN(id),
  })
}
