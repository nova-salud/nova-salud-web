import { useState } from 'react'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import type { QueryParams } from '@/core/types/query-params.type'
import type { EmoProtocolResponseDto, FindEmoProtocolsDto } from '../../types'
import { EMO_PROTOCOL_QUERY_KEYS } from '../../constants/emo-protocol-query-keys'
import { emoProtocolService } from '../../services/emo-protocol.service'
import { keepPreviousData } from '@tanstack/react-query'

type ExtraFilters = Omit<FindEmoProtocolsDto, keyof QueryParams>

export const useEmoProtocols = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedName = useDebounce(extraFilters.name, 450)

  const result = usePaginatedQuery<EmoProtocolResponseDto, FindEmoProtocolsDto>({
    queryKey: EMO_PROTOCOL_QUERY_KEYS.list({ ...extraFilters, name: debouncedName }),
    queryFn: (filters) => emoProtocolService.findAll({
      ...filters,
      ...extraFilters,
      name: debouncedName || undefined,
    }),
    placeholderData: keepPreviousData
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return {
    ...result,
    onChangeFilters,
  }
}
