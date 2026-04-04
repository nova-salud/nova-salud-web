import type { BackendError } from '@/core/types/backend-error.type'

const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error inesperado.'

export const parseBackendError = (error: unknown): string => {
  if (!error) return DEFAULT_ERROR_MESSAGE

  const backendError = error as BackendError

  // Caso: message = string[]
  if (Array.isArray(backendError?.message)) {
    return backendError.message[0] ?? DEFAULT_ERROR_MESSAGE
  }

  // Caso: message = string
  if (typeof backendError?.message === 'string') {
    return backendError.message
  }

  return DEFAULT_ERROR_MESSAGE
}