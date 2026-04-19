import { useCallback, useEffect, useState } from 'react'
import type { AttentionAttachmentResponseDto } from '../types'
import { attentionAttachmentService } from '../services/attention-attachment.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const useAttentionAttachments = (attentionId: number | null | undefined) => {
  const [data, setData] = useState<AttentionAttachmentResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAttachments = useCallback(async () => {
    if (!attentionId || Number.isNaN(attentionId)) {
      setData([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await attentionAttachmentService.findByAttentionId(attentionId)
      setData(result)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [attentionId])

  useEffect(() => {
    void fetchAttachments()
  }, [fetchAttachments])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAttachments,
  }
}