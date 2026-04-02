import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { BackendError } from '@/core/types/backend-error.type'
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

  const create = async (dto: CreateDispensationDto): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await dispensationService.create(dto)
      navigate(`/dispensations/${result.id}`)
    } catch (err) {
      const backendError = err as BackendError
      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo registrar la dispensación.')
      } else {
        setError(backendError.message ?? 'No se pudo registrar la dispensación.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
    error,
  }
}