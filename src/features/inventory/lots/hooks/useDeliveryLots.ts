import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { lotService } from '../services/lot.service'

export const useDeliveryLots = (deliveryId: number) => {
  const fetcher = useCallback(
    () => lotService.findByDeliveryId(deliveryId),
    [deliveryId],
  )

  return useQuery(fetcher, [])
}
