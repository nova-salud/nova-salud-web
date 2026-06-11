import { useAppQuery } from '@/shared/hooks'
import { userService } from '../services/user.service'

export const useUser = (id: number) => {
  return useAppQuery({
    queryKey: ['users', id],
    queryFn: () => userService.findById(id),
    enabled: !Number.isNaN(id),
  })
}
