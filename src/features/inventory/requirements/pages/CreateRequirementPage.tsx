import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useStocks } from '@/features/inventory/stocks/hooks/useStocks'
import { useCreateRequirement } from '../hooks/useCreateRequirement'
import type { CreateInventoryRequirementItemDto } from '../types/create-inventory-requirement-item.dto'
import { Input, Select, Textarea } from '@/shared/components/ui/form'

const CreateRequirementPage = () => {
  const { create, isLoading, error } = useCreateRequirement()
  const [requestNote, setRequestNote] = useState('')
  const [selectedMedicationId, setSelectedMedicationId] = useState('')
  const [requestedQuantity, setRequestedQuantity] = useState('1')
  const [items, setItems] = useState<CreateInventoryRequirementItemDto[]>([])

  const { data: stocks } = useStocks({
    page: 1,
    pageSize: 100,
    sortBy: 'commercialName',
    sortOrder: 'ASC',
  })

  const medicationOptions = useMemo(
    () =>
      stocks
        .filter((item) => item.currentStock <= item.minimumStock)
        .map((item) => ({
          label: `${item.commercialName} (stock: ${item.currentStock})`,
          value: item.medicationId,
        })),
    [stocks],
  )

  const handleAddItem = () => {
    const medicationId = Number(selectedMedicationId)
    const quantity = Number(requestedQuantity)

    if (!medicationId || quantity <= 0) {
      return
    }

    const exists = items.some((item) => item.medicationId === medicationId)
    if (exists) {
      return
    }

    setItems((prev) => [
      ...prev,
      {
        medicationId,
        requestedQuantity: quantity,
      },
    ])

    setSelectedMedicationId('')
    setRequestedQuantity('1')
  }

  const handleRemoveItem = (medicationId: number) => {
    setItems((prev) => prev.filter((item) => item.medicationId !== medicationId))
  }

  const handleSubmit = async () => {
    if (!items.length) {
      return
    }

    await create({
      requestNote: requestNote.trim() || undefined,
      items,
    })
  }

  return (
    <PageContainer
      title="Nuevo requerimiento"
      description="Solicitud de compra de medicamentos con stock bajo"
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Información general</h3>

          <Textarea
            label="Observación"
            placeholder="Ej: Reposición urgente por consumo semanal."
            value={requestNote}
            onChange={(e) => setRequestNote(e.target.value)}
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Medicamentos solicitados</h3>

          <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
            <Select
              label="Medicamento"
              value={selectedMedicationId}
              onChange={setSelectedMedicationId}
              options={medicationOptions}
            />

            <Input
              type="number"
              label="Cantidad"
              placeholder="Ej: 20"
              value={requestedQuantity}
              onChange={setRequestedQuantity}
            />

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddItem}
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-sm text-slate-500">No has agregado medicamentos.</p>
            ) : (
              items.map((item) => {
                const stock = stocks.find((stockItem) => stockItem.medicationId === item.medicationId)

                return (
                  <div
                    key={item.medicationId}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {stock?.commercialName ?? `Medicamento ${item.medicationId}`}
                      </p>
                      <p className="text-xs text-slate-500">
                        Cantidad solicitada: {item.requestedQuantity}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.medicationId)}
                      className="text-sm text-red-500"
                    >
                      Quitar
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={isLoading || items.length === 0}
            onClick={() => void handleSubmit()}
            className="rounded-2xl bg-[#0B1739] px-6 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Guardar requerimiento'}
          </button>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateRequirementPage