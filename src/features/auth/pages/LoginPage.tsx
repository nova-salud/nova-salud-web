import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router'
import { Button, Input } from '@/shared/components/ui/form'
import { useAuth } from '@/shared/hooks/useAuth'
import { useLogin } from '../hooks/useLogin'

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const { login, isLoading, clearError } = useLogin()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clearError()

    await login({
      username: username.trim(),
      password,
    })
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden flex-1 overflow-hidden bg-[#0F172A] lg:flex">
        <div className="flex w-full flex-col justify-center p-14">
          <div className="max-w-xl">
            <div className="flex justify-center rounded-[2.5rem] border border-white/10 bg-white/3 px-10 py-12 backdrop-blur-sm">
              <img
                src="/logos/logo-login.png"
                alt="Nova SST"
                className="h-40 w-auto object-contain"
              />
            </div>

            <div className="mt-14">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                Nova Perú SST
              </p>

              <h1 className="mt-5 text-4xl font-medium leading-tight text-white">
                Sistema médico ocupacional
              </h1>

              <p className="mt-6 text-base leading-8 text-slate-400">
                Gestiona medicamentos, requerimientos, dispensaciones,
                accidentes, EMOs y movimientos de inventario desde una sola
                plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              Iniciar sesión
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Usuario"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={setUsername}
              autoComplete="username"
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Ingresando..."
              className="w-full"
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage