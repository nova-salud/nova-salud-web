import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { medicalRestService } from '../services/medical-rest.service'

export const useMedicalRests = (clinicalHistoryId: number) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) =>
      medicalRestService.findAll({ clinicalHistoryId, page, pageSize }),
    [clinicalHistoryId],
  )

  return usePaginatedQuery(fetcher)
}
