import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useDelivery } from '../hooks/useDelivery'
import { useDeliveryLots } from '@/features/inventory/lots/hooks/useDeliveryLots'
import DeliveryLotsTable from '@/features/inventory/lots/components/DeliveryLotsTable'

const getStatusClasses = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'border border-amber-100 bg-amber-50 text-amber-700'
    case 'IN_PROGRESS':
      return 'border border-sky-100 bg-sky-50 text-sky-700'
    case 'COMPLETED':
      return 'border border-emerald-100 bg-emerald-50 text-emerald-700'
    case 'CANCELLED':
      return 'border border-red-100 bg-red-50 text-red-600'
    default:
      return 'border border-slate-200 bg-slate-50 text-slate-500'
  }
}

const DeliveryDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()

  const deliveryId = Number(params.id)
  const [cancelReason, setCancelReason] = useState('')

  const {
    data: delivery,
    isLoading,
    error,
    completeDelivery,
    cancelDelivery,
    isSubmitting,
  } = useDelivery(deliveryId)

  const {
    data: lots,
    isLoading: isLotsLoading,
    error: lotsError,
    refetch: refetchLots,
  } = useDeliveryLots(deliveryId)

  if (Number.isNaN(deliveryId)) {
    return (
      <PageContainer title="Detalle de entrega" description="Identificador inválido.">
        <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          El identificador de la entrega no es válido.
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={`Entrega #${delivery?.id ?? deliveryId}`}
      description="Detalle operativo de la entrega de inventario"
      action={
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate('/deliveries')}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Volver
          </button>

          <button
            type="button"
            className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
          >
            Registrar lote
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Cargando detalle de entrega...</p>
          </div>
        ) : null}

        {delivery ? (
          <>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">
                    Información general
                  </h2>

                  <span
                    className={[
                      'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                      getStatusClasses(delivery.status),
                    ].join(' ')}
                  >
                    {delivery.status}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      Entregado por
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {delivery.deliveredByUser?.username ?? `Usuario ${delivery.deliveredByUserId}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      Recibido por
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {delivery.receivedByUser?.username ??
                        (delivery.receivedByUserId ? `Usuario ${delivery.receivedByUserId}` : '-')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      Fecha de entrega
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {new Date(delivery.deliveryDate).toLocaleDateString('es-PE')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      Procesada
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {delivery.processedAt
                        ? new Date(delivery.processedAt).toLocaleDateString('es-PE')
                        : '-'}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      Nota
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {delivery.deliveryNote ?? 'Sin observaciones.'}
                    </p>
                  </div>

                  {delivery.cancellationReason ? (
                    <div className="md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        Motivo de cancelación
                      </p>
                      <p className="mt-1 text-sm text-red-600">
                        {delivery.cancellationReason}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">
                  Acciones
                </h2>

                <div className="space-y-3">
                  <button
                    type="button"
                    disabled={isSubmitting || delivery.status === 'COMPLETED' || delivery.status === 'CANCELLED'}
                    onClick={() => void completeDelivery().then(() => void refetchLots())}
                    className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Completar entrega
                  </button>

                  <div className="space-y-2">
                    <textarea
                      value={cancelReason}
                      onChange={(event) => setCancelReason(event.target.value)}
                      placeholder="Motivo de cancelación (opcional)"
                      className="min-h-[90px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                    />

                    <button
                      type="button"
                      disabled={isSubmitting || delivery.status === 'COMPLETED' || delivery.status === 'CANCELLED'}
                      onClick={() => void cancelDelivery(cancelReason)}
                      className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancelar entrega
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {lotsError ? (
              <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {lotsError}
              </div>
            ) : null}

            <div className="space-y-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Lotes registrados
                </h2>
                <p className="text-sm text-slate-500">
                  Lotes cargados desde esta entrega.
                </p>
              </div>

              <DeliveryLotsTable items={lots} isLoading={isLotsLoading} />
            </div>
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default DeliveryDetailPage