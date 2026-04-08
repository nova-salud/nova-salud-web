import { useAsyncAction } from '@/core/hooks/use-async-action'
import { userService } from '../services/user.service'

export const useUpdateUserStatus = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [number, boolean],
    { message: string }
  >(
    async (id: number, isActive: boolean) => await userService.updateStatus(id, { isActive }),
    {
      successMessage: 'Estado del usuario actualizado correctamente.',
    },
  )

  return {
    updateStatus: async (id: number, isActive: boolean) => {
      const result = await execute(id, isActive)
      return result !== null
    },
    isLoading,
    error,
    clearError,
  }
}