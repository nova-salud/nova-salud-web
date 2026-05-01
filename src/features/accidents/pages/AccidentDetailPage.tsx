import { Button } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router'
import { useAccident } from '../hooks/useAccident'
import { ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL, ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL } from '../types'

const AccidentDetailPage = () => {
  const navigate = useNavigate()
  const { accidentId: id, employeeId } = useParams()

  const numericId = Number(id)
  const numericEmployeeId = Number(employeeId)

  const { data: accident, isLoading, error } = useAccident(numericId)

  if (isLoading) return <div>Cargando...</div>
  if (!accident) return <div>No encontrado</div>

  return (
    <PageContainer
      title={`Accidente #${accident.id}`}
      description="Detalle del accidente registrado."
      action={
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          onClick={() =>
            navigate(`/clinical-histories/${numericEmployeeId}`)
          }
        >
          Volver
        </Button>
      }
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Accidente #{accident.id}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {accident.occurredAt
                  ? format(new Date(accident.occurredAt), 'dd/MM/yyyy HH:mm')
                  : '-'}
              </p>
            </div>

            <div className="flex gap-2 text-xs">
              <span
                className={cn(
                  'rounded-xl px-3 py-1',
                  ACCIDENT_TYPE_CLASSNAME[accident.type],
                )}
              >
                {ACCIDENT_TYPE_LABEL[accident.type]}
              </span>

              <span
                className={cn(
                  'rounded-xl px-3 py-1',
                  ACCIDENT_STATUS_CLASSNAME[accident.status],
                )}
              >
                {ACCIDENT_STATUS_LABEL[accident.status]}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Información del accidente
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Descripción
              </p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {accident.description || 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Tipo
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {ACCIDENT_TYPE_LABEL[accident.type]}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Estado
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {ACCIDENT_STATUS_LABEL[accident.status]}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Fecha
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {accident.occurredAt
                  ? format(new Date(accident.occurredAt), 'dd/MM/yyyy HH:mm')
                  : '-'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Derivación
              </p>
              <div className="mt-1 text-sm text-slate-700">
                {accident.requiresExternalReferral
                  ? 'Sí'
                  : 'No'}
              </div>
            </div>

            {accident.requiresExternalReferral && (
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Centro de salud
                </p>
                <div className="mt-1 text-sm text-slate-700">
                  {accident.healthcareCenter?.name || 'No registrado'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default AccidentDetailPage