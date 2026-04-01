import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useAuth } from '@/shared/hooks/useAuth'
import { RoleEnum } from '@/core/enums/role.enum'
import { cn } from '@/shared/utils'
import { useRequirement } from '../hooks/useRequirement'
import { useMarkRequirementDelivered } from '../hooks/useMarkRequirementDelivered'
import { useConfirmRequirement } from '../hooks/useConfirmRequirement'
import type { ConfirmInventoryRequirementItemDto } from '../types/confirm-inventory-requirement.dto'
import { Input, Textarea } from '@/shared/components/ui/form'

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Pendiente'
    case 'DELIVERED':
      return 'Entregado'
    case 'RECEIVED_PARTIAL':
      return 'Recepción parcial'
    case 'RECEIVED_COMPLETE':
      return 'Recepción completa'
    case 'CANCELLED':
      return 'Cancelado'
    default:
      return status
  }
}

const getStatusClassName = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'border-amber-100 bg-amber-50 text-amber-700'
    case 'DELIVERED':
      return 'border-sky-100 bg-sky-50 text-sky-700'
    case 'RECEIVED_PARTIAL':
      return 'border-orange-100 bg-orange-50 text-orange-700'
    case 'RECEIVED_COMPLETE':
      return 'border-emerald-100 bg-emerald-50 text-emerald-700'
    case 'CANCELLED':
      return 'border-red-100 bg-red-50 text-red-600'
    default:
      return 'border-slate-200 bg-slate-50 text-slate-500'
  }
}

const RequirementDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { user } = useAuth()
  const { data, isLoading, error, refetch } = useRequirement(id)
  const { markDelivered, isLoading: isDelivering, error: deliverError } = useMarkRequirementDelivered()
  const { confirm, isLoading: isConfirming, error: confirmError } = useConfirmRequirement()

  const [evidenceUrl, setEvidenceUrl] = useState('')
  const [deliveryNote, setDeliveryNote] = useState('')
  const [confirmItems, setConfirmItems] = useState<Record<number, ConfirmInventoryRequirementItemDto>>({})

  const canDeliver = data?.status === 'PENDING'
  const canConfirm = data?.status === 'DELIVERED'

  const initializedItems = useMemo(() => {
    if (!data) {
      return {}
    }

    return data.items.reduce<Record<number, ConfirmInventoryRequirementItemDto>>((acc, item) => {
      acc[item.id] = {
        itemId: item.id,
        isReceived: item.isReceived,
        receivedQuantity: item.receivedQuantity ?? 0,
      }
      return acc
    }, {})
  }, [data])

  const currentItems = Object.keys(confirmItems).length ? confirmItems : initializedItems

  const handleChangeItem = (
    itemId: number,
    changes: Partial<ConfirmInventoryRequirementItemDto>,
  ) => {
    setConfirmItems((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] ?? initializedItems[itemId]),
        ...changes,
      },
    }))
  }

  const handleDeliver = async () => {
    if (!data) {
      return
    }

    const result = await markDelivered(data.id, {
      evidenceUrl,
      deliveryNote: deliveryNote.trim() || undefined,
    })

    if (result) {
      await refetch()
    }
  }

  const handleConfirm = async () => {
    if (!data) {
      return
    }

    const result = await confirm(data.id, {
      items: data.items.map((item) => currentItems[item.id] ?? {
        itemId: item.id,
        isReceived: false,
        receivedQuantity: 0,
      }),
    })

    if (result) {
      await refetch()
    }
  }

  if (Number.isNaN(id)) {
    return <div>ID inválido</div>
  }

  return (
    <PageContainer
      title={`Requerimiento #${data?.id ?? id}`}
      description="Detalle del requerimiento"
      action={
        <button
          type="button"
          onClick={() => navigate('/requirements')}
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
                    getStatusClassName(data.status),
                  )}
                >
                  {getStatusLabel(data.status)}
                </span>
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
                  <p className="mt-1 text-sm text-slate-600">
                    {data.requestNote ?? 'Sin observaciones.'}
                  </p>
                </div>

                {data.deliveryNote ? (
                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observación de entrega</p>
                    <p className="mt-1 text-sm text-slate-600">{data.deliveryNote}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Medicamentos</h3>

              <div className="space-y-3">
                {data.items.map((item) => {
                  const current = currentItems[item.id] ?? {
                    itemId: item.id,
                    isReceived: false,
                    receivedQuantity: 0,
                  }

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 p-4 space-y-3"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {item.medicationName ?? `Medicamento ${item.medicationId}`}
                          </p>
                          <p className="text-xs text-slate-500">
                            Cantidad solicitada: {item.requestedQuantity}
                          </p>
                        </div>
                      </div>

                      {canConfirm ? (
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input
                              type="checkbox"
                              checked={current.isReceived}
                              onChange={(e) =>
                                handleChangeItem(item.id, {
                                  itemId: item.id,
                                  isReceived: e.target.checked,
                                  receivedQuantity: e.target.checked ? current.receivedQuantity : 0,
                                })
                              }
                            />
                            Recibido
                          </label>

                          <Input
                            type="number"
                            label="Cantidad recibida"
                            placeholder="Ej: 10"
                            value={current.receivedQuantity}
                            onChange={(value) =>
                              handleChangeItem(item.id, {
                                itemId: item.id,
                                receivedQuantity: Number(value),
                              })
                            }
                          />
                        </div>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Recibido</p>
                            <p className="mt-1 text-sm text-slate-700">{item.isReceived ? 'Sí' : 'No'}</p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Cantidad recibida</p>
                            <p className="mt-1 text-sm text-slate-700">{item.receivedQuantity ?? 0}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {canDeliver ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Marcar como entregado</h3>

                {deliverError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {deliverError}
                  </div>
                ) : null}

                <div className="grid gap-4">
                  <Input
                    label="URL de evidencia"
                    placeholder="https://..."
                    value={evidenceUrl}
                    onChange={setEvidenceUrl}
                  />

                  <Textarea
                    label="Observación de entrega"
                    placeholder="Ej: Compra realizada y entregada a farmacia."
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => void handleDeliver()}
                    disabled={isDelivering}
                    className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isDelivering ? 'Guardando...' : 'Marcar como entregado'}
                  </button>
                </div>
              </div>
            ) : null}

            {canConfirm ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Confirmar recepción</h3>

                {confirmError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {confirmError}
                  </div>
                ) : null}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => void handleConfirm()}
                    disabled={isConfirming}
                    className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isConfirming ? 'Confirmando...' : 'Confirmar recepción'}
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default RequirementDetailPage