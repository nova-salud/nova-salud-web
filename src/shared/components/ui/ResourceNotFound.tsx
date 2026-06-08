import { FileSearch } from 'lucide-react'
import { Button } from '@/shared/components/ui/form'

type Props = {
  title?: string
  description?: string
  onBack?: () => void
}

const ResourceNotFound = ({
  title = 'Recurso no encontrado',
  description = 'El recurso que buscas no existe o ya no está disponible.',
  onBack,
}: Props) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
          <FileSearch size={28} />
        </div>

        <h2 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>

        {onBack && (
          <div className="mt-6 flex justify-center">
            <Button type="button" variant="outline" onClick={onBack} className="w-auto">
              Volver
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResourceNotFound
