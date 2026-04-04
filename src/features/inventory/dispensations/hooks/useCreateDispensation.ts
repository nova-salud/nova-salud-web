import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dispensationService } from '../services/dispensation.service'
import type { CreateDispensationDto } from '../types/create-dispensation.dto'

type UseCreateDispensationReturn = {
  create: (dto: CreateDispensationDto) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useCreateDispensation = (): UseCreateDispensationReturn => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (dto: CreateDispensationDto): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.create(dto)

      navigate(`/dispensations/${result.id}`)
    } catch (error) {
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  return {
    create,
    isLoading,
    error,
  }
}