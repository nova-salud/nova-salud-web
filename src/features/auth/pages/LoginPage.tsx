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
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="relative hidden flex-1 overflow-hidden bg-[#0B1739] lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_35%)]" />

        <div className="relative flex w-full flex-col justify-center px-16 py-12">
          <div className="max-w-xl">
            <div className="rounded-[2.5rem] bg-white px-8 py-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] grid place-items-center">
              <img
                src="/logos/logo-login.png"
                alt="Pescanova"
                className="w-[75%] object-contain"
              />
            </div>

            <div className="mt-12">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">
                Nova Perú SST
              </p>

              <h1 className="mt-5 max-w-lg text-5xl font-semibold leading-tight text-white">
                Plataforma médica ocupacional
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Centraliza atenciones clínicas, accidentes, EMOs,
                medicamentos y seguimiento ocupacional en un solo sistema.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-start md:items-center justify-center overflow-hidden bg-white px-6 py-8 lg:px-12">
        <div className="flex w-full max-w-xl flex-col items-center">
          <div className="mb-8 flex justify-center">
            <img
              src="/logos/logo-login-2.png"
              alt="Grupo Nueva Pescanova"
              className="h-52 md:h-32 w-auto object-contain"
            />
          </div>

          <div className="w-full max-w-md px-2">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-semibold text-slate-900">
                Iniciar sesión
              </h2>

              <p className="mt-3 text-base text-slate-500">
                Ingresa tus credenciales para continuar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                className="mt-2 w-full"
              >
                Ingresar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage