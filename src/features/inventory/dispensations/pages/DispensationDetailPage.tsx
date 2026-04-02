import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { cn } from '@/shared/utils'
import { useDispensation } from '../hooks/useDispensation'

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'COLLABORATOR':
      return 'Colaborador'
    case 'THIRD_PARTY':
      return 'Tercero'
    case 'ATTENTION':
      return 'Atención'
    default:
      return type
  }
}

const getTypeClassName = (type: string) => {
  switch (type) {
    case 'COLLABORATOR':
      return 'border-sky-100 bg-sky-50 text-sky-700'
    case 'THIRD_PARTY':
      return 'border-amber-100 bg-amber-50 text-amber-700'
    case 'ATTENTION':
      return 'border-emerald-100 bg-emerald-50 text-emerald-700'
    default:
      return 'border-slate-200 bg-slate-50 text-slate-500'
  }
}

const DispensationDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { data, isLoading, error } = useDispensation(id)

  if (Number.isNaN(id)) {
    return <div>ID inválido</div>
  }

  return (
    <PageContainer
      title={`Dispensación #${data?.id ?? id}`}
      description="Detalle de la dispensación"
      action={
        <button
          type="button"
          onClick={() => navigate('/dispensations')}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Volver
        </button>
      }
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Cargando dispensación...</p>
          </div>
        ) : null}

        {data ? (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                    getTypeClassName(data.dispenseType),
                  )}
                >
                  {getTypeLabel(data.dispenseType)}
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
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">DNI colaborador</p>
                  <p className="mt-1 text-sm text-slate-700">{data.collaboratorDni ?? '-'}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">DNI tercero</p>
                  <p className="mt-1 text-sm text-slate-700">{data.thirdPartyDni ?? '-'}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Atención</p>
                  <p className="mt-1 text-sm text-slate-700">{data.attentionId ?? '-'}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Diagnóstico</p>
                  <p className="mt-1 text-sm text-slate-700">{data.diagnosisCode ?? '-'}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observaciones</p>
                  <p className="mt-1 text-sm text-slate-700">{data.notes ?? 'Sin observaciones.'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Medicamentos dispensados</h3>

              <div className="space-y-3">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.medicationName ?? `Medicamento ${item.medicationId}`}
                        </p>
                        <p className="text-xs text-slate-500">Lote: {item.lotCode ?? '-'}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Cantidad</p>
                        <p className="mt-1 text-sm text-slate-700">{item.quantity}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Indicación</p>
                        <p className="mt-1 text-sm text-slate-700">{item.doseInstruction ?? '-'}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observación</p>
                        <p className="mt-1 text-sm text-slate-700">{item.observation ?? '-'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default DispensationDetailPage