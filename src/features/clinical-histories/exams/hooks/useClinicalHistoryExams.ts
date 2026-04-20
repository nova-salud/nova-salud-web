import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import type { ClinicalHistoryExamResponseDto } from '../types'
import { clinicalHistoryExamService } from '../services/clinical-history-exam.service'

export const useClinicalHistoryExams = (clinicalHistoryId: number | null | undefined) => {
  const [data, setData] = useState<ClinicalHistoryExamResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExams = useCallback(async () => {
    if (!clinicalHistoryId || Number.isNaN(clinicalHistoryId)) {
      setData([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await clinicalHistoryExamService.findByClinicalHistory(clinicalHistoryId)
      setData(result)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [clinicalHistoryId])

  useEffect(() => {
    void fetchExams()
  }, [fetchExams])

  return {
    data,
    isLoading,
    error,
    refetch: fetchExams,
  }
}