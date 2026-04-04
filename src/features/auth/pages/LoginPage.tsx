import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router'
import { LockKeyhole, ShieldUser } from 'lucide-react'
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
      <div className="hidden flex-1 bg-[#0B1739] lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white">
            <ShieldUser size={26} />
          </div>

          <div className="mt-8 max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
              Nova Perú SST
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">
              Sistema médico ocupacional
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-300">
              Gestiona medicamentos, requerimientos, dispensaciones y movimientos
              de inventario desde una sola plataforma.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-300">
            Acceso exclusivo para personal autorizado.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-[#0B1739] text-white shadow-sm">
              <LockKeyhole size={24} />
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-slate-900">
              Iniciar sesión
            </h2>

            <p className="mt-2 text-sm text-slate-500">
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