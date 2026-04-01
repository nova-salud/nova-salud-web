import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { BackendError } from '@/core/types/backend-error.type'
import { requirementService } from '../services/requirement.service'
import type { CreateInventoryRequirementDto } from '../types/create-inventory-requirement.dto'

type UseCreateRequirementReturn = {
  create: (dto: CreateInventoryRequirementDto) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useCreateRequirement = (): UseCreateRequirementReturn => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (dto: CreateInventoryRequirementDto): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      await requirementService.create(dto)

      navigate('/requirements')
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo crear el requerimiento.')
      } else {
        setError(backendError.message ?? 'No se pudo crear el requerimiento.')
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