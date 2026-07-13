import { useNavigate, useParams } from 'react-router'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { cn } from '@/shared/utils'
import { DispensationDetailSkeleton } from '../components/DispensationDetailSkeleton'
import { useDispensation } from '../hooks/useDispensation'
import {
  DISPENSE_TYPE_CLASS_MAP,
  DISPENSE_TYPE_LABEL_MAP,
} from '../types/dispensation-response.dto'

const DEFAULT_TYPE_CLASS_NAME = 'border-slate-200 bg-slate-50 text-slate-500'

const DispensationDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { data, isLoading, error, refetch } = useDispensation(id)

  if (Number.isNaN(id)) {
    return (
      <EntityState
        title="ID inválido"
        description="El identificador de la dispensación no es válido."
        actionText="Regresar"
        onAction={() => navigate('/dispensations')}
      />
    )
  }

  if (isLoading) return <DispensationDetailSkeleton />

  if (error) {
    return (
      <EntityState
        title="Ocurrió un error"
        description={error.message}
        actionText="Reintentar"
        onAction={refetch}
      />
    )
  }

  if (!data) {
    return (
      <EntityState
        title="Dispensación no encontrada"
        description="La dispensación que intentas consultar no existe o fue eliminada."
        actionText="Regresar"
        onAction={() => navigate('/dispensations')}
      />
    )
  }

  return (
    <PageContainer
      title={data.employeeFullName ? `Dispensación — ${data.employeeFullName}` : 'Dispensación'}
      description="Detalle de la dispensación"
      action={
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/dispensations')}
          className="w-auto px-4 py-2"
        >
          Volver
        </Button>
      }
    >
      <div className="space-y-5">
        {data.employeeId ? (
          <div className="space-y-4 rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Trabajador</h3>
              {data.employeeIsThirdParty && (
                <span className="inline-flex rounded-xl border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Externo
                </span>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Nombres</p>
                <p className="mt-1 text-sm text-slate-700">{data.employeeFirstName ?? '-'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Apellidos</p>
                <p className="mt-1 text-sm text-slate-700">{data.employeeLastName ?? '-'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">DNI</p>
                <p className="mt-1 text-sm text-slate-700">{data.employeeDni ?? '-'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Cargo</p>
                <p className="mt-1 text-sm text-slate-700">{data.employeePosition ?? '-'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Área</p>
                <p className="mt-1 text-sm text-slate-700">{data.employeeArea ?? '-'}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-4 rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                DISPENSE_TYPE_CLASS_MAP[data.dispenseType] ?? DEFAULT_TYPE_CLASS_NAME,
              )}
            >
              {DISPENSE_TYPE_LABEL_MAP[data.dispenseType] ?? data.dispenseType}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fecha</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {new Date(data.dispensedAt).toLocaleDateString('es-PE')}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Motivo</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{data.reason}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Atención</p>
              <p className="mt-1 text-sm text-slate-700">{data.attentionId ?? '-'}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Diagnóstico</p>
              <p className="mt-1 text-sm text-slate-700">{data.diagnosisCode ?? '-'}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Dispensado por</p>
              <p className="mt-1 text-sm text-slate-700">{data.dispensedByUserName ?? '-'}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observaciones</p>
              <p className="mt-1 text-sm text-slate-700">{data.notes ?? 'Sin observaciones.'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-900">Medicamentos dispensados</h3>

          <div className="space-y-3">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border-2 border-slate-300 p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.medicationName || `Medicamento ${item.medicationId}`}
                    </p>
                    <p className="text-xs text-slate-500">
                      Lote: {item.medicationLotCode || '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Cantidad</p>
                    <p className="mt-1 text-sm text-slate-700">{item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default DispensationDetailPage
