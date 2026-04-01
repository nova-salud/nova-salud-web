import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { BackendError } from '@/core/types/backend-error.type'
import { medicationService } from '../services/medication.service'
import type { CreateMedicationDto } from '../types/create-medication.dto'

export const useCreateMedication = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (dto: CreateMedicationDto) => {
    try {
      setIsLoading(true)
      setError(null)

      await medicationService.create(dto)

      navigate('/medications')
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0])
      } else {
        setError(backendError.message ?? 'Error al crear medicamento')
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