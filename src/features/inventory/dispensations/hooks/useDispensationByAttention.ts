import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useCallback, useEffect, useState } from 'react'
import { dispensationService } from '../services/dispensation.service'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'

export const useDispensationByAttention = (attentionId: number) => {
  const [data, setData] = useState<DispensationResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!attentionId || Number.isNaN(attentionId)) return

    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.findByAttentionId(attentionId)

      setData(result)
    } catch (error) {
      setError(parseBackendError(error))
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [attentionId])

  useEffect(() => {
    void fetch()
  }, [fetch])

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
  }
}