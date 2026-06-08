type Env = {
  VITE_API_URL: string
  VITE_APP_NAME?: string
}

const _env = import.meta.env as unknown as Env

export const env = {
  apiUrl: _env.VITE_API_URL,
  appName: _env.VITE_APP_NAME ?? 'Nova SST',
}