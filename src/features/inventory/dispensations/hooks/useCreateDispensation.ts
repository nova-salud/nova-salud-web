import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { dispensationService } from '../services/dispensation.service'
import type { CreateDispensationDto } from '../types/create-dispensation.dto'
import type { DispensationResponseDto } from '../types/dispensation-response.dto'

type UseCreateDispensationOptions = {
  redirectOnSuccess?: boolean
}

type UseCreateDispensationReturn = {
  create: (dto: CreateDispensationDto) => Promise<DispensationResponseDto | null>
  isLoading: boolean
  error: string | null
}

export const useCreateDispensation = (
  options: UseCreateDispensationOptions = {},
): UseCreateDispensationReturn => {
  const { redirectOnSuccess = true } = options
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (
    dto: CreateDispensationDto,
  ): Promise<DispensationResponseDto | null> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.create(dto)

      if (redirectOnSuccess) {
        navigate(`/dispensations/${result.id}`)
      }

      return result
    } catch (error) {
      setError(parseBackendError(error))
      return null
    } finally {
      setIsLoading(false)
    }
  }, [navigate, redirectOnSuccess])

  return {
    create,
    isLoading,
    error,
  }
}