import { useCallback } from 'react'
import { usePaginatedQuery } from '@/core/hooks/usePaginatedQuery'
import { userService } from '../services/user.service'
import type { FindUsersDto } from '../types/find-users.dto'

export const useUsers = (query: FindUsersDto) => {
  const fetcher = useCallback(
    (page: number, pageSize: number) => userService.findAll({ ...query, page, pageSize }),
    [query],
  )

  return usePaginatedQuery(fetcher, query.pageSize)
}
