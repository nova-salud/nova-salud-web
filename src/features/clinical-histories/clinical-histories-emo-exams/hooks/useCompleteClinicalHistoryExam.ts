import { useCallback, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalHistoryExamService, type CompleteClinicalHistoryExamDto } from '../services/clinical-history-exam.service'

export const useCompleteClinicalHistoryExam = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const completeClinicalHistoryExam = useCallback(
    async (
      id: number,
      dto: CompleteClinicalHistoryExamDto,
      file: File,
    ) => {
      try {
        setIsLoading(true)
        setError(null)

        return await clinicalHistoryExamService.complete(id, dto, file)
      } catch (error) {
        setError(parseBackendError(error))
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  return {
    isLoading,
    error,
    completeClinicalHistoryExam,
  }
}