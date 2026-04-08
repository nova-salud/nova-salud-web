import { useNavigate } from 'react-router'
import { FileSearch } from 'lucide-react'
import { Button } from '@/shared/components/ui/form'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
          <FileSearch size={28} />
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-slate-900">
          Página no encontrada
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          La ruta que intentaste abrir no existe o ya no está disponible.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-auto"
          >
            Volver
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

export default NotFoundPage