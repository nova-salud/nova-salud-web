import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { requirementService } from '../services/requirement.service'
import type { CreateInventoryRequirementDto } from '../types/create-inventory-requirement.dto'

export const useCreateRequirement = () => {
  const navigate = useNavigate()

  const action = useCallback(
    async (dto: CreateInventoryRequirementDto) => {
      const result = await requirementService.create(dto)
      navigate('/requirements')
      return result
    },
    [navigate],
  )

  const { execute: create, isLoading, error, clearError } = useAsyncAction(action)
  return { create, isLoading, error, clearError }
}
