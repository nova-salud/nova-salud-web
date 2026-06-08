import { env } from './env'

export const API_CONFIG = {
  baseURL: env.apiUrl ?? '/api/v1',
  timeout: 10000,
}