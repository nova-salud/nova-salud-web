import { useAppQuery } from '@/shared/hooks'
import { lotService } from '../services/lot.service'

export const useDeliveryLots = (deliveryId: number) => {
  const { data, ...rest } = useAppQuery({
    queryKey: ['delivery-lots', deliveryId],
    queryFn: () => lotService.findByDeliveryId(deliveryId),
  })
  return { ...rest, data: data ?? [] }
}
