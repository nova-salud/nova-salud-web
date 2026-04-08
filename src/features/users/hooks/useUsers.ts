import { useCallback, useEffect, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { userService } from '../services/user.service'
import type { FindUsersDto } from '../types/find-users.dto'
import type { UserResponseDto } from '../types/user-response.dto'

type UseUsersReturn = {
  data: UserResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useUsers = (
  query: FindUsersDto,
): UseUsersReturn => {
  const [response, setResponse] = useState<PaginatedResponse<UserResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await userService.findAll(query)
      setResponse(result)
    } catch (error) {
      const message = parseBackendError(error)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchUsers()
  }, [fetchUsers])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchUsers,
  }
}