import { useAsyncAction } from '@/core/hooks/use-async-action'
import { userService } from '../services/user.service'
import type { CreateUserDto } from '../types/create-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'

export const useCreateUser = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateUserDto],
    UserResponseDto
  >(
    userService.create.bind(userService),
    {
      successMessage: 'Usuario creado correctamente.',
    },
  )

  return {
    create: execute,
    isLoading,
    error,
    clearError,
  }
}