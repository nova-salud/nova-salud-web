import { useAppQuery } from '@/shared/hooks'
import { emoProtocolService } from '../../services/emo-protocol.service'
import { EMO_PROTOCOL_QUERY_KEYS } from '../../constants/emo-protocol-query-keys'

export const useEmoProtocol = (id: number) => {
  return useAppQuery({
    queryKey: EMO_PROTOCOL_QUERY_KEYS.detail(id),
    queryFn: () => emoProtocolService.findById(id),
    enabled: !!id,
  })
}