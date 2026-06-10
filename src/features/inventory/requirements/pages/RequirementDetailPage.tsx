import { useNavigate, useParams } from 'react-router'
import { EntityState, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { cn } from '@/shared/utils'
import { useRequirement } from '../hooks/useRequirement'
import { useConfirmRequirement } from '../hooks/useConfirmRequirement'
import { MarkDeliveredModal } from '../components/MarkDeliveredModal'
import { ConfirmReceptionSidebar } from '../components/ConfirmReceptionSidebar'
import { STATUS_CLASSES, STATUS_LABELS } from '../types/inventory-requirement-response.dto'
import { InventoryRequirementStatusEnum } from '../types/inventory-requirement-status.enum'
import type { ConfirmInventoryRequirementItemDto } from '../types/confirm-inventory-requirement.dto'
import { RequirementDetailSkeleton } from '../components/RequirementDetailSkeleton'

type RequirementDetailOverlay = 'deliver' | 'confirm'

const RequirementDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const requirementId = Number(id)

  const { data, isLoading, error, refetch } = useRequirement(requirementId)
  const overlays = useDisclosure<RequirementDetailOverlay>()
  const { confirm, isLoading: isConfirming, error: confirmError } = useConfirmRequirement()

  const canDeliver = data?.status === InventoryRequirementStatusEnum.PENDING
  const canConfirm = data?.status === InventoryRequirementStatusEnum.DELIVERED

  const handleConfirm = async (items: ConfirmInventoryRequirementItemDto[]) => {
    if (!data) return
    const result = await confirm(data.id, { items })
    if (result) {
      overlays.close()
      await refetch()
    }
  }

  if (isLoading) return <RequirementDetailSkeleton /> 
  

  if (!data) {
    return (
      <EntityState
        title="Requerimiento no encontrado"
        description="El requerimiento que intentas consultar no existe o fue eliminado."
        actionText="Volver a requerimientos"
        onAction={() => navigate('/requirements')}
      />
    )
  }

  if (error) {
    return (
      <EntityState
        title="Ocurrió un error"
        description="No fue posible obtener la información del requerimiento."
        actionText="Reintentar"
        onAction={() => void refetch()}
      />
    )
  }

  return (
    <PageContainer
      title={`Requerimiento ${data.code}`}
      description="Detalle del requerimiento"
      action={
        <div className="flex items-center gap-2">
          {canConfirm ? (
            <button
              type="button"
              onClick={() => overlays.open('confirm')}
              className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
            >
              Confirmar recepción
            </button>
          ) : null}

          {canDeliver ? (
            <button
              type="button"
              onClick={() => overlays.open('deliver')}
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
      </div>

      {overlays.isOpen('deliver') ? (
        <MarkDeliveredModal
          requirementId={data.id}
          onSuccess={() => { overlays.close(); void refetch() }}
          onClose={overlays.close}
        />
      ) : null}

      <ConfirmReceptionSidebar
        isOpen={overlays.isOpen('confirm')}
        onClose={overlays.close}
        items={data.items}
        isConfirming={isConfirming}
        confirmError={confirmError}
        onConfirm={handleConfirm}
      />
    </PageContainer>
  )
}

export default RequirementDetailPage
