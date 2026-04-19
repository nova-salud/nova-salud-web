import { useCallback, useEffect, useState } from 'react'
import type { SignatureResponseDto } from '../types'
import { signatureService } from '../services/signature.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const useSignatures = (attentionId: number | null | undefined) => {
  const [data, setData] = useState<SignatureResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSignatures = useCallback(async () => {
    if (!attentionId || Number.isNaN(attentionId)) {
      setData([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await signatureService.findByAttentionId(attentionId)
      setData(result)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [attentionId])

  useEffect(() => {
    void fetchSignatures()
  }, [fetchSignatures])

  return {
    data,
    isLoading,
    error,
    refetch: fetchSignatures,
  }
}