import { useAsyncAction } from '@/core/hooks/use-async-action'
import { userService } from '../services/user.service'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'

export const useUpdateUser = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateUserDto],
    UserResponseDto
  >(
    userService.update.bind(userService),
    {
      successMessage: 'Usuario actualizado correctamente.',
    },
  )

  return {
    update: execute,
    isLoading,
    error,
    clearError,
  }
}