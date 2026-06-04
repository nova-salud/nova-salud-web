import { useEffect, useMemo, useState } from 'react'
import { Sidebar } from '@/shared/components/ui/sidebar/Sidebar'
import { Input } from '@/shared/components/ui/form'
import type { ConfirmInventoryRequirementItemDto } from '../types/confirm-inventory-requirement.dto'
import type { InventoryRequirementItemResponseDto } from '../types/inventory-requirement-item-response.dto'

type LocalItem = ConfirmInventoryRequirementItemDto & {
  lotCode: string
  expirationDate: string
  totalCost: number | undefined
}

type Props = {
  isOpen: boolean
  onClose: () => void
  items: InventoryRequirementItemResponseDto[]
  isConfirming: boolean
  confirmError: string | null
  onConfirm: (items: ConfirmInventoryRequirementItemDto[]) => Promise<void>
}

export const ConfirmReceptionSidebar = ({
  isOpen,
  onClose,
  items,
  isConfirming,
  confirmError,
  onConfirm,
}: Props) => {
  const [localItems, setLocalItems] = useState<Record<number, LocalItem>>({})

  useEffect(() => {
    if (!isOpen) return

    const initial = items.reduce<Record<number, LocalItem>>((acc, item) => {
      acc[item.id] = {
        itemId: item.id,
        isReceived: item.isReceived,
        receivedQuantity: item.receivedQuantity ?? 0,
        lotCode: '',
        expirationDate: '',
        totalCost: undefined,
      }
      return acc
    }, {})

    setLocalItems(initial)
  }, [isOpen, items])

  const update = (itemId: number, changes: Partial<LocalItem>) => {
    setLocalItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], ...changes },
    }))
  }

  const handleCheck = (itemId: number, checked: boolean) => {
    update(itemId, {
      isReceived: checked,
      receivedQuantity: checked ? (localItems[itemId]?.receivedQuantity ?? 0) : 0,
      lotCode: checked ? (localItems[itemId]?.lotCode ?? '') : '',
      expirationDate: checked ? (localItems[itemId]?.expirationDate ?? '') : '',
      totalCost: checked ? localItems[itemId]?.totalCost : undefined,
    })
  }

  const orderTotal = useMemo(() => {
    return Object.values(localItems).reduce((sum, item) => {
      return sum + (item.isReceived && item.totalCost ? item.totalCost : 0)
    }, 0)
  }, [localItems])

  const handleSubmit = async () => {
    await onConfirm(
      Object.values(localItems).map((item) => {
        const base: ConfirmInventoryRequirementItemDto = {
          itemId: item.itemId,
          isReceived: item.isReceived,
          receivedQuantity: item.receivedQuantity,
        }

        if (item.isReceived) {
          if (item.lotCode) base.lotCode = item.lotCode
          if (item.expirationDate) base.expirationDate = item.expirationDate
          if (item.totalCost !== undefined) base.totalCost = item.totalCost
        }

        return base
      }),
    )
    if (!confirmError) {
      onClose()
    }
  }

  return (
    <Sidebar
      isOpen={isOpen}
      title="Confirmar recepción"
      description="Registra los medicamentos recibidos y sus cantidades."
      onClose={onClose}
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isConfirming}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isConfirming}
            className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isConfirming ? 'Confirmando...' : 'Confirmar recepción'}
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {confirmError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {confirmError}
          </div>
        ) : null}

        {items.map((item) => {
          const current = localItems[item.id] ?? {
            itemId: item.id,
            isReceived: false,
            receivedQuantity: 0,
            lotCode: '',
            expirationDate: '',
            totalCost: undefined,
          }

          const unitCost =
            current.isReceived &&
            current.totalCost &&
            current.receivedQuantity > 0
              ? (current.totalCost / current.receivedQuantity).toFixed(2)
              : null

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.medicationName ?? `Medicamento ${item.medicationId}`}
                  </p>
                  <p className="text-xs text-slate-500">
                    Cantidad solicitada: {item.requestedQuantity}
                  </p>
                </div>

                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={current.isReceived}
                    onChange={(e) => handleCheck(item.id, e.target.checked)}
                  />
                  Recibido
                </label>
              </div>

              {current.isReceived ? (
                <div className="space-y-3">
                  <div className="grid gap-3 grid-cols-2">
                    <Input
                      name={`quantity-${item.id}`}
                      type="number"
                      label="Cantidad recibida"
                      placeholder="Ej: 10"
                      value={current.receivedQuantity}
                      onChange={(e) => update(item.id, { receivedQuantity: Number(e.target.value) })}
                    />

                    <Input
                      name={`lot-${item.id}`}
                      type="text"
                      label="Código de lote"
                      placeholder="Ej: LOT-2024-001"
                      value={current.lotCode}
                      onChange={(e) => update(item.id, { lotCode: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-3 grid-cols-2">
                    <Input
                      name={`expiration-${item.id}`}
                      type="date"
                      label="Fecha de vencimiento"
                      value={current.expirationDate}
                      onChange={(e) => update(item.id, { expirationDate: e.target.value })}
                    />

                    <Input
                      name={`cost-${item.id}`}
                      type="number"
                      label="Costo total (S/.)"
                      placeholder="Ej: 150.00"
                      value={current.totalCost ?? ''}
                      onChange={(e) =>
                        update(item.id, {
                          totalCost: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>

                  {unitCost ? (
                    <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
                      Costo unitario: <span className="font-medium text-slate-700">S/. {unitCost}</span>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          )
        })}

        {orderTotal > 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">Total del pedido</p>
            <p className="text-sm font-semibold text-slate-900">S/. {orderTotal.toFixed(2)}</p>
          </div>
        ) : null}
      </div>
    </Sidebar>
  )
}

export default ConfirmReceptionSidebar
