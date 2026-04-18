import { Button } from '@/shared/components/ui/form'
import type { ClinicalHistoryFullResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  data: ClinicalHistoryFullResponseDto
  onEdit?: () => void
  onCreateAttention?: () => void
}

const ClinicalHistoryHeader = ({
  data,
  onEdit,
  onCreateAttention,
}: Props) => {
  const { employee } = data

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="space-y-2">
        <div className='flex justify-between'>
          <h1 className="text-2xl font-semibold text-slate-900">
            Historia clínica #{data.id}
          </h1>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              Editar
            </Button>

            <Button onClick={onCreateAttention}>
              Nueva atención
            </Button>
          </div>
        </div>

        {employee && (
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-900">
              {employee.fullName}
            </span>
            <span className="text-slate-500">
              DNI: {employee.dni}
            </span>
            <span className="text-slate-500">
              {employee.company} · {employee.area?.name ?? '—'} · {employee.position ?? '—'}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-xs mt-4">
          <span className="rounded-xl bg-slate-100 px-3 py-1 text-slate-600">
            Grupo: {data.bloodType || '—'}
          </span>

          <span
            className={`rounded-xl px-3 py-1 font-medium ${data.isActive
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-red-100 text-red-700'
              }`}
          >
            {data.isActive ? 'Activa' : 'Inactiva'}
          </span>

          <span className="rounded-xl bg-blue-100 px-3 py-1 text-blue-700">
            {data.allergies.length} alergias
          </span>

          <span className="rounded-xl bg-purple-100 px-3 py-1 text-purple-700">
            {data.attentions.length} atenciones
          </span>
        </div>
      </div>
    </div>
  )
}

export default ClinicalHistoryHeader