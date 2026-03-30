import axios from 'axios'
import { API_CONFIG } from '@/config/api'
import { authSession } from '@/core/auth/auth-session'
import { useAuthStore } from '@/shared/store/auth.store'
import type { BackendError } from '@/core/types/backend-error.type'
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from '@/core/constants/messages.constants'

export const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  }
})

axiosInstance.interceptors.request.use((config) => {
  const token = authSession.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject<BackendError>({
        message: NETWORK_ERROR_MESSAGE,
        error: 'Network Error',
        statusCode: 0,
      })
    }

    const backendError = error.response.data as BackendError

    if (backendError?.statusCode === 401) {
      useAuthStore.getState().clearSession()

      return Promise.reject<BackendError>({
        message: backendError.message || UNAUTHORIZED_MESSAGE,
        error: backendError.error || 'Unauthorized',
        statusCode: 401,
      })
    }

    return Promise.reject<BackendError>({
      message: backendError?.message || INTERNAL_SERVER_ERROR_MESSAGE,
      error: backendError?.error || 'Internal Server Error',
      statusCode: backendError?.statusCode || 500,
    })
  },
)