import { useNavigate } from 'react-router'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/shared/components/ui/form'

type Props = {
  title?: string
  description?: string
}

const ErrorPage = ({
  title = 'Ocurrió un error inesperado',
  description = 'No se pudo completar la acción solicitada. Intenta nuevamente o regresa a una sección segura del sistema.',
}: Props) => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600">
          <AlertTriangle size={28} />
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-slate-900">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-auto"
          >
            Reintentar
          </Button>

          <Button
            type="button"
            onClick={() => navigate('/')}
            className="w-auto"
          >
            Ir al dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage