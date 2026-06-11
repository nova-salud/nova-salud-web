type Env = {
  VITE_API_URL?: string
  VITE_FILE_BASE_URL: string
  VITE_APP_NAME?: string
}

const _env = import.meta.env as unknown as Env

if(!_env.VITE_FILE_BASE_URL) {
  throw new Error('El VITE_FILE_BASE_URL es necesario')
}

export const env = {
  apiUrl: _env.VITE_API_URL,
  fileBaseUrl: _env.VITE_FILE_BASE_URL,
  appName: _env.VITE_APP_NAME ?? 'Nova SST',
}