import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { emoProtocolService } from '../../services/emo-protocol.service'
import type { FindEmoProtocolsDto } from '../../types'

export const useEmoProtocols = (query: FindEmoProtocolsDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => emoProtocolService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
