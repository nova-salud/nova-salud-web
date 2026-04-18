import { useCallback, useEffect, useState } from 'react'
import type { AttentionResponseDto } from '../types'
import { attentionService } from '../services/attention.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const useAttention = (id: number) => {
  const [data, setData] = useState<AttentionResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAttention = useCallback(async () => {
    if (!id || Number.isNaN(id)) {
      setError('ID de atención inválido')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await attentionService.findById(id)
      setData(result)
    } catch (error) {
      setData(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void fetchAttention()
  }, [fetchAttention])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAttention,
  }
}