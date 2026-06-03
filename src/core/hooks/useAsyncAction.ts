import { useCallback, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'

type UseAsyncActionOptions<TOutput> = {
  successMessage?: string | ((result: TOutput) => string)
  errorMessage?: string
  showSuccessToast?: boolean
  showErrorToast?: boolean
}

type UseAsyncActionReturn<TInput extends unknown[], TOutput> = {
  execute: (...args: TInput) => Promise<TOutput | null>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export const useAsyncAction = <TInput extends unknown[], TOutput>(
  action: (...args: TInput) => Promise<TOutput>,
  options?: UseAsyncActionOptions<TOutput>,
): UseAsyncActionReturn<TInput, TOutput> => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (...args: TInput): Promise<TOutput | null> => {
      try {
        setIsLoading(true)
        setError(null)

        const result = await action(...args)

        if (options?.showSuccessToast !== false && options?.successMessage) {
          const message =
            typeof options.successMessage === 'function'
              ? options.successMessage(result)
              : options.successMessage

          toastService.success(message)
        }

        return result
      } catch (error) {
        const message = options?.errorMessage ?? parseBackendError(error)

        setError(message)

        if (options?.showErrorToast !== false) {
          toastService.error(message)
        }

        return null
      } finally {
        setIsLoading(false)
      }
    },
    [action, options],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    execute,
    isLoading,
    error,
    clearError,
  }
}