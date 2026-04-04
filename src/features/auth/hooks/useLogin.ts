import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { authService } from '../services/auth.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { useAuthStore } from '@/shared/store/auth.store'

type LoginDto = {
  username: string
  password: string
}

type UseLoginReturn = {
  login: (dto: LoginDto) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export const useLogin = (): UseLoginReturn => {
  const setSession = useAuthStore((state) => state.setSession)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (dto: LoginDto) => {
    try {
      setIsLoading(true)
      setError(null)

      const session = await authService.login(dto)
      setSession(session)

      toastService.success('Bienvenido 👋')
      navigate('/')
    } catch (err) {
      const message = parseBackendError(err)

      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  const clearError = () => setError(null)

  return {
    login,
    isLoading,
    error,
    clearError,
  }
}