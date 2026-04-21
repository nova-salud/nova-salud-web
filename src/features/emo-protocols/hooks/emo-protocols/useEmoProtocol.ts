import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { emoProtocolService } from '../../services/emo-protocol.service'
import type { EmoProtocolResponseDto } from '../../types'

export const useEmoProtocol = (id: number) => {
  const [data, setData] = useState<EmoProtocolResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmoProtocol = useCallback(async () => {
    if (!id || Number.isNaN(id)) {
      setData(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await emoProtocolService.findById(id)
      setData(result)
    } catch (error) {
      setData(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void fetchEmoProtocol()
  }, [fetchEmoProtocol])

  return {
    data,
    isLoading,
    error,
    refetch: fetchEmoProtocol,
  }
}