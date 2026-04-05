import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
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

  const { data, isLoading, error } = useDispensation(id)

  if (Number.isNaN(id)) {
    return <div>ID inválido</div>
  }

  return (
    <PageContainer
      title={`Dispensación #${data?.id ?? id}`}
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
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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