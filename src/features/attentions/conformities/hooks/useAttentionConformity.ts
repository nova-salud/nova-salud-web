import { useCallback, useEffect, useState } from 'react'
import { attentionConformityService } from '../services/attention-conformity.service'
import type { AttentionConformityResponseDto } from '../types/attention-conformity.types'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const useAttentionConformity = (attentionId: number) => {
  const [data, setData] = useState<AttentionConformityResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await attentionConformityService.findByAttention(attentionId)
      setData(result)
    } catch (err) {
      setError(parseBackendError(err))
    } finally {
      setIsLoading(false)
    }
  }, [attentionId])

  useEffect(() => {
    void fetch()
  }, [fetch])

  return { data, isLoading, error, refetch: fetch }
}
