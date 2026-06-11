import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { dispensationService } from '../services/dispensation.service'
import type { CreateDispensationDto } from '../types/create-dispensation.dto'

export const useCreateDispensation = (options: { redirectOnSuccess?: boolean } = {}) => {
  const { redirectOnSuccess = true } = options
  const navigate = useNavigate()

  const action = useCallback(
    async (dto: CreateDispensationDto) => {
      const result = await dispensationService.create(dto)
      if (redirectOnSuccess) navigate(`/dispensations/${result.id}`)
      return result
    },
    [navigate, redirectOnSuccess],
  )

  const { execute: create, isLoading, error, clearError } = useAsyncAction(action)
  return { create, isLoading, error, clearError }
}
