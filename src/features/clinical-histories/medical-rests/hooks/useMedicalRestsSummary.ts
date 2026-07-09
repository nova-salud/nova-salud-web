import { useAppQuery } from '@/shared/hooks'
import { medicalRestService } from '../services/medical-rest.service'
import type { FindMedicalRestsParams } from '../services/medical-rest.service'

export const useMedicalRestsSummary = (params: FindMedicalRestsParams, enabled = true) => {
  const { data, ...rest } = useAppQuery({
    queryKey: ['medical-rests-summary', params],
    queryFn: () => medicalRestService.getSummary(params),
    enabled,
  })

  return { ...rest, summary: data ?? { totalDays: 0, count: 0 } }
}
