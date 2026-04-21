import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { emoProtocolService } from '../../services/emo-protocol.service'
import type { EmoProtocolResponseDto, FindEmoProtocolsDto } from '../../types'

export const useEmoProtocols = (query: FindEmoProtocolsDto) => {
  const [data, setData] = useState<EmoProtocolResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmoProtocols = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await emoProtocolService.findAll(query)
      setData(response.data)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchEmoProtocols()
  }, [fetchEmoProtocols])

  return {
    data,
    isLoading,
    error,
    refetch: fetchEmoProtocols,
  }
}