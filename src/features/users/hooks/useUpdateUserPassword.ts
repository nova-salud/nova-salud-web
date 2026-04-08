import { useAsyncAction } from '@/core/hooks/use-async-action'
import { userService } from '../services/user.service'
import type { UpdateUserPasswordDto } from '../types/update-user-password.dto'

export const useUpdateUserPassword = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, UpdateUserPasswordDto],
    { message: string }
  >(
    userService.updatePassword.bind(userService),
    {
      successMessage: 'Contraseña actualizada correctamente.',
    },
  )

  return {
    updatePassword: async (id: number, dto: UpdateUserPasswordDto) => {
      const result = await execute(id, dto)
      return result !== null
    },
    isLoading,
    error,
    clearError,
  }
}