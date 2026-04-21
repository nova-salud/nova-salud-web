import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import { examService } from '../services/exam.service'
import type { FindExamsDto, ExamResponseDto } from '../types'

export const useExams = (query: FindExamsDto) => {
  const [data, setData] = useState<ExamResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExams = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await examService.findAll(query)
      setData(response.data)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

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