import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { cn } from '@/shared/utils'
import { useRequirementDetail } from '../hooks/useRequirementDetail'
import { STATUS_CLASSES, STATUS_LABELS } from '../types/inventory-requirement-response.dto'
import { MarkDeliveredModal } from '../components/MarkDeliveredModal'
import { ConfirmReceptionSidebar } from '../components/ConfirmReceptionSidebar'

const RequirementDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const {
    data,
    isLoading,
    error,
    refetch,
    canDeliver,
    canConfirm,
    isConfirming,
    confirmError,
    isDeliverModalOpen,
    openDeliverModal,
    closeDeliverModal,
    isConfirmSidebarOpen,
    openConfirmSidebar,
    closeConfirmSidebar,
    handleConfirm,
  } = useRequirementDetail(id)

  if (Number.isNaN(id)) {
    return <div>ID inválido</div>
  }

  return (
    <PageContainer
      title={`Requerimiento ${data?.code ?? 'REQ-XXXX'}`}
      description="Detalle del requerimiento"
      action={
        <div className="flex items-center gap-2">
          {canConfirm ? (
            <button
              type="button"
              onClick={openConfirmSidebar}
              className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
            >
              Confirmar recepción
            </button>
          ) : null}

          {canDeliver ? (
            <button
              type="button"
              onClick={openDeliverModal}
              className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
            >
              Marcar como entregado
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => navigate('/requirements')}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Volver
          </button>
        </div>
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
            <p className="text-sm text-slate-500">Cargando requerimiento...</p>
          </div>
        ) : null}

        {data ? (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                    STATUS_CLASSES[data.status],
                  )}
                >
                  {STATUS_LABELS[data.status]}
                </span>

                {data.evidenceUrl ? (
                  <a
                    href={data.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Ver evidencia
                  </a>
                ) : null}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Código</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{data.code}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Solicitado</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {new Date(data.createdAt).toLocaleDateString('es-PE')}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Entregado</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {data.deliveredAt ? new Date(data.deliveredAt).toLocaleDateString('es-PE') : '-'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observación de solicitud</p>
                  <p className="mt-1 text-sm text-slate-600">{data.requestNote ?? 'Sin observaciones.'}</p>
                </div>

                {data.deliveryNote ? (
                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observación de entrega</p>
                    <p className="mt-1 text-sm text-slate-600">{data.deliveryNote}</p>
                  </div>
                ) : null}

                {data.totalCost != null ? (
                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Costo total del pedido</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">S/. {Number(data.totalCost).toFixed(2)}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Medicamentos solicitados</h3>

              <div className="space-y-2">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.medicationName ?? `Medicamento ${item.medicationId}`}
                      </p>
                      <p className="text-xs text-slate-500">
                        Solicitado: {item.requestedQuantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-xs text-slate-400">Recibido</p>
                        <p className="text-sm font-medium text-slate-700">{item.isReceived ? 'Sí' : 'No'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Cantidad</p>
                        <p className="text-sm font-medium text-slate-700">{item.receivedQuantity ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">C. unitario</p>
                        <p className="text-sm font-medium text-slate-700">
                          {item.totalCost && item.receivedQuantity
                            ? `S/. ${(item.totalCost / item.receivedQuantity).toFixed(2)}`
                            : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">C. total</p>
                        <p className="text-sm font-medium text-slate-700">
                          {item.totalCost != null ? `S/. ${Number(item.totalCost).toFixed(2)}` : '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {isDeliverModalOpen && data ? (
        <MarkDeliveredModal
          requirementId={data.id}
          onSuccess={() => void refetch()}
          onClose={closeDeliverModal}
        />
      ) : null}

      {data ? (
        <ConfirmReceptionSidebar
          isOpen={isConfirmSidebarOpen}
          onClose={closeConfirmSidebar}
          items={data.items}
          isConfirming={isConfirming}
          confirmError={confirmError}
          onConfirm={handleConfirm}
        />
      ) : null}
    </PageContainer>
  )
}

export default RequirementDetailPage
