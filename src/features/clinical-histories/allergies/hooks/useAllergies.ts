import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { allergyService } from '../services/allergy.service'

export const useAllergies = (clinicalHistoryId: number | null | undefined) => {
  const enabled = Boolean(clinicalHistoryId && !Number.isNaN(clinicalHistoryId))

  const fetcher = useCallback(
    () => allergyService.findByClinicalHistory(clinicalHistoryId!),
    [clinicalHistoryId],
  )

  return useQuery(fetcher, [], enabled)
}
