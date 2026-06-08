import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { medicalRestService } from '../services/medical-rest.service'

type Params = {
  clinicalHistoryId: number
  accidentId?: number
  attentionId?: number
}

export const useMedicalRests = ({ clinicalHistoryId, accidentId, attentionId }: Params) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      medicalRestService.findAll({ clinicalHistoryId, accidentId, attentionId, page, pageSize }),
    [clinicalHistoryId, accidentId, attentionId],
  )

  return usePaginatedQuery(fetcher)
}
