import { env } from './env'

export const API_CONFIG = {
  baseURL: env.apiUrl,
  timeout: 10000,
}