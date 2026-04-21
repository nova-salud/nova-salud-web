import { useCallback, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { EmitClinicalHistoryConclusionDto } from '../types'

export const useEmitClinicalHistoryConclusion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const emitClinicalHistoryConclusion = useCallback(
    async (id: number, dto: EmitClinicalHistoryConclusionDto) => {
      try {
        setIsLoading(true)
        setError(null)

        return await clinicalHistoryEmoCycleService.emitConclusion(id, dto)
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
    emitClinicalHistoryConclusion,
  }
}