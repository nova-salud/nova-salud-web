import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import { healthcareCenterService } from '../services/healthcare-center.service'
import type { FindHealthcareCentersDto, HealthcareCenterResponseDto } from '../types'

export const useHealthcareCenters = (query: FindHealthcareCentersDto) => {
  const [data, setData] = useState<HealthcareCenterResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthcareCenters = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await healthcareCenterService.findAll(query)
      setData(response.data)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchHealthcareCenters()
  }, [fetchHealthcareCenters])

  return {
    data,
    isLoading,
    error,
    refetch: fetchHealthcareCenters,
  }
}