import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import type { ClinicalHistoryFullResponseDto } from '../types'

type Props = {
  data: ClinicalHistoryFullResponseDto
  canCreateAttention: boolean
  onEdit?: () => void
  onCreateAttention?: () => void
}

type InfoItemProps = {
  label: string
  value: string | null
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="rounded-2xl bg-slate-50 px-4 py-3">
    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-slate-700">
      {value?.trim() ? value : '—'}
    </p>
  </div>
)

const ClinicalHistoryHeader = ({
  data,
  canCreateAttention,
  onCreateAttention,
}: Props) => {
  const { employee } = data

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Historia clínica #{data.id}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Grupo {data.bloodType || '—'}
            </span>

            <span
              className={cn(
                'rounded-xl px-3 py-1 text-xs font-medium',
                data.isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700',
              )}
            >
              {data.isActive ? 'Activa' : 'Inactiva'}
            </span>

            <span className="rounded-xl bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {data.allergies.length} alergias
            </span>

            <span className="rounded-xl bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              {data.attentions.length} atenciones
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {/* <Button variant="outline" className="w-auto" onClick={onEdit}>
            Editar
          </Button> */}

          {canCreateAttention && <Button className="w-auto" onClick={onCreateAttention}>
            Nueva atención
          </Button>}
        </div>
      </div>

      {employee && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoItem label="Nombre" value={employee.fullName} />
          <InfoItem label="DNI" value={employee.dni} />
          <InfoItem
            label="Empresa / Área / Puesto"
            value={`${employee.company} · ${employee.area?.name ?? '—'} · ${employee.position ?? '—'}`}
          />
        </div>
      )}
    </div>
  )
}

export default ClinicalHistoryHeader