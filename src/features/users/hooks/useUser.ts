import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { userService } from '../services/user.service'
import type { UserResponseDto } from '../types/user-response.dto'

type UseUserReturn = {
  data: UserResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useUser = (id: number): UseUserReturn => {
  const [data, setData] = useState<UserResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await userService.findById(id)
      setData(result)
    } catch (error) {
      const message = parseBackendError(error)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!Number.isNaN(id)) {
      void fetchUser()
    }
  }, [id, fetchUser])

  return {
    data,
    isLoading,
    error,
    refetch: fetchUser,
  }
}