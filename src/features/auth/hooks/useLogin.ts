import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { authService } from '../services/auth.service'
import { useAuthStore } from '@/shared/store/auth.store'

type LoginDto = {
  username: string
  password: string
}

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession)
  const navigate = useNavigate()

  const action = useCallback(
    async (dto: LoginDto) => {
      const session = await authService.login(dto)
      setSession(session)
      navigate('/')
      return session
    },
    [setSession, navigate],
  )

  const { execute, isLoading, error, clearError } = useAsyncAction(action, {
    successMessage: 'Bienvenido 👋',
  })

  return { login: execute, isLoading, error, clearError }
}
