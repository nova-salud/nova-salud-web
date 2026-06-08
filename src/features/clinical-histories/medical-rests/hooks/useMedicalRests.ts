import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { medicalRestService } from '../services/medical-rest.service'

type Params = {
  clinicalHistoryId: number
  accidentId?: number
}

export const useMedicalRests = ({ clinicalHistoryId, accidentId }: Params) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      medicalRestService.findAll({ clinicalHistoryId, accidentId, page, pageSize }),
    [clinicalHistoryId, accidentId],
  )

  return usePaginatedQuery(fetcher)
}
