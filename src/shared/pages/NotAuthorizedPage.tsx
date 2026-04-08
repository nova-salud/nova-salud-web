import { useNavigate } from 'react-router'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/shared/components/ui/form'

const NotAuthorizedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-amber-600">
          <ShieldAlert size={28} />
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-slate-900">
          No autorizado
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          No tienes permisos para acceder a esta sección del sistema.
        </p>

        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-auto"
          >
            Retroceder
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotAuthorizedPage