import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import { accidentService } from '../services/accident.service'
import type { AccidentResponseDto } from '../types'

export const useAccident = (id: number) => {
  const [data, setData] = useState<AccidentResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAccident = useCallback(async () => {
    if (!id || Number.isNaN(id)) {
      setError('ID de accidente inválido')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await accidentService.findById(id)
      setData(result)
    } catch (error) {
      setData(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void fetchAccident()
  }, [fetchAccident])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAccident,
  }
}