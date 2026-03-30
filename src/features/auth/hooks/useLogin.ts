import { useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { useAuthStore } from '@/shared/store/auth.store'
import { authService } from '../services/auth.service'
import type { LoginDto } from '../types/login.dto'

type UseLoginReturn = {
  login: (payload: LoginDto) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export const useLogin = (): UseLoginReturn => {
  const setSession = useAuthStore((state) => state.setSession)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginDto): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const session = await authService.login(payload)
      setSession(session)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'Ocurrió un error al iniciar sesión.')
      } else {
        setError(backendError.message ?? 'Ocurrió un error al iniciar sesión.')
      }

      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = (): void => {
    setError(null)
  }

  return {
    login,
    isLoading,
    error,
    clearError,
  }
}