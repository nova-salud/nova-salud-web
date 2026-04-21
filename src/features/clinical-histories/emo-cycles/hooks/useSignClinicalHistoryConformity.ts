import { useCallback, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'
import type { SignClinicalHistoryConformityDto } from '../types'

export const useSignClinicalHistoryConformity = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signClinicalHistoryConformity = useCallback(
    async (id: number, dto: SignClinicalHistoryConformityDto) => {
      try {
        setIsLoading(true)
        setError(null)

        return await clinicalHistoryEmoCycleService.signConformity(id, dto)
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
    signClinicalHistoryConformity,
  }
}