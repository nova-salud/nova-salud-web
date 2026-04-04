import { toast } from 'sonner'

export const toastService = {
  success: (message: string) => {
    toast.success(message)
  },

  error: (message: string) => {
    toast.error(message)
  },

  info: (message: string) => {
    toast(message)
  },

  promise: async <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string
    },
  )=> {
    toast.promise(promise, messages)
  },
}