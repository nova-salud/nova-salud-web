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
  async (error) => {
    if (!error.response) {
      return Promise.reject<BackendError>({
        message: NETWORK_ERROR_MESSAGE,
        error: 'Network Error',
        statusCode: 0,
      })
    }

    let data = error.response.data as BackendError

    // When responseType is 'blob', error bodies arrive as Blob — parse them as JSON
    if (data instanceof Blob) {
      try {
        data = JSON.parse(await data.text()) as BackendError
      } catch {
        data = {} as BackendError
      }
    }

    if (data?.statusCode === 401) {
      useAuthStore.getState().clearSession()

      return Promise.reject<BackendError>({
        message: data.message || UNAUTHORIZED_MESSAGE,
        error: data.error || 'Unauthorized',
        statusCode: 401,
      })
    }

    return Promise.reject<BackendError>({
      message: data?.message || INTERNAL_SERVER_ERROR_MESSAGE,
      error: data?.error || 'Internal Server Error',
      statusCode: data?.statusCode || 500,
    })
  },
)