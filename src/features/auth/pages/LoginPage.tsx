import { useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/shared/hooks/useAuth'
import { useLogin } from '../hooks/useLogin'

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const { login, isLoading, error, clearError } = useLogin()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    clearError()

    await login({
      username: username.trim(),
      password,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            N
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Nova Perú</h1>
          <p className="mt-1 text-xs text-slate-500">
            Sistema médico ocupacional
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            autoComplete="username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            autoComplete="current-password"
            required
          />
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage