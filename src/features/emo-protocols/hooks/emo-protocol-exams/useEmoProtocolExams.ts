import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import type { EmoProtocolExamResponseDto } from '../../types'
import { emoProtocolExamService } from '../../services/emo-protocol-exam.service'

export const useEmoProtocolExams = (emoProtocolId: number) => {
  const [data, setData] = useState<EmoProtocolExamResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmoProtocolExams = useCallback(async () => {
    if (!emoProtocolId || Number.isNaN(emoProtocolId)) {
      setData([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const result = await emoProtocolExamService.findByProtocolId(emoProtocolId)
      setData(result)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [emoProtocolId])

  useEffect(() => {
    void fetchEmoProtocolExams()
  }, [fetchEmoProtocolExams])

  return {
    data,
    isLoading,
    error,
    refetch: fetchEmoProtocolExams,
  }
}