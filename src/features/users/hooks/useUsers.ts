import { useState } from 'react'
import type { QueryParams } from '@/core/types/query-params.type'
import type { FindUsersDto } from '../types/find-users.dto'
import type { UserResponseDto } from '../types/user-response.dto'
import { USER_QUERY_KEYS } from '../constants/user-query-keys'
import { userService } from '../services/user.service'
import { useDebounce, usePaginatedQuery } from '@/shared/hooks'
import { keepPreviousData } from '@tanstack/react-query'

type ExtraFilters = Omit<FindUsersDto, keyof QueryParams>

export const useUsers = () => {
  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({})
  const debouncedUsername = useDebounce(extraFilters.username, 450)

  const result = usePaginatedQuery<UserResponseDto, FindUsersDto>({
    queryKey: USER_QUERY_KEYS.list({ ...extraFilters, username: debouncedUsername }),
    queryFn: (filters) => userService.findAll({
      ...filters,
      ...extraFilters,
      username: debouncedUsername || undefined,
    }),
    placeholderData: keepPreviousData
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setExtraFilters(prev => ({ ...prev, ...filters }))
    result.goToPage(1)
  }

  return {
    ...result,
    onChangeFilters,
  }
}
