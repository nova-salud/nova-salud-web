import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import { accidentService } from '../services/accident.service'
import type { AccidentResponseDto } from '../types'
import type { FindAccidentsDto } from '../types/find-accidents.dto'

export const useAccidents = (query: FindAccidentsDto) => {
  const [data, setData] = useState<AccidentResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAccidents = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await accidentService.findAll(query)
      setData(response.data)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchAccidents()
  }, [fetchAccidents])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAccidents,
  }
}