import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useStocks } from '@/features/inventory/stocks/hooks/useStocks'
import { useCreateDispensation } from '../hooks/useCreateDispensation'
import { DispenseTypeEnum } from '../types/dispense-type.enum'
import type { CreateDispensationItemDto } from '../types/create-dispensation-item.dto'
import { Input, Select, Textarea } from '@/shared/components/ui/form'
import { useAuth } from '@/shared/hooks/useAuth'

const CreateDispensationPage = () => {
  const { create, isLoading, error } = useCreateDispensation()
  const { user } = useAuth()

  const [dispenseType, setDispenseType] = useState<DispenseTypeEnum>(DispenseTypeEnum.ATTENTION)
  const [thirdPartyDni, setThirdPartyDni] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedMedicationId, setSelectedMedicationId] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [doseInstruction, setDoseInstruction] = useState('')
  const [observation, setObservation] = useState('')
  const [items, setItems] = useState<CreateDispensationItemDto[]>([])

  const { data: stocks } = useStocks({
    page: 1,
    pageSize: 100,
    sortBy: 'commercialName',
    sortOrder: 'ASC',
    isActive: true,
  })

  const medicationOptions = useMemo(
    () =>
      stocks
        .filter((item) => item.currentStock > 0)
        .map((item) => ({
          label: `${item.commercialName} (stock: ${item.currentStock})`,
          value: item.medicationId,
        })),
    [stocks],
  )

  const handleAddItem = () => {
    const medicationId = Number(selectedMedicationId)
    const parsedQuantity = Number(quantity)

    if (!medicationId || parsedQuantity <= 0) {
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
        quantity: parsedQuantity,
        doseInstruction: doseInstruction.trim() || undefined,
        observation: observation.trim() || undefined,
      },
    ])

    setSelectedMedicationId('')
    setQuantity('1')
    setDoseInstruction('')
    setObservation('')
  }

  const handleRemoveItem = (medicationId: number) => {
    setItems((prev) => prev.filter((item) => item.medicationId !== medicationId))
  }

  const handleSubmit = async () => {
    if (!items.length || !reason.trim()) {
      return
    }

    const dto = {
      dispenseType,
      thirdPartyDni: thirdPartyDni.trim() || undefined,
      reason: reason.trim(),
      dispensedByUserId: user?.id ?? 0,
      notes: notes.trim() || undefined,
      items,
    }

    console.log({ dto })
    await create(dto) 
  }

  return (
    <PageContainer
      title="Nueva dispensación"
      description="Registro de salida de medicamentos"
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Información general</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Tipo de dispensación"
              value={dispenseType}
              onChange={(value) => setDispenseType(value as DispenseTypeEnum)}
              options={[
                { label: 'Atención médica', value: DispenseTypeEnum.ATTENTION },
                { label: 'OTC (Libre)', value: DispenseTypeEnum.OTC },
                { label: 'Emergencia', value: DispenseTypeEnum.EMERGENCY },
                { label: 'Tercero', value: DispenseTypeEnum.THIRD_PARTY },
              ]}
            />

            <Input
              label="Motivo"
              placeholder="Ej: Dolor de cabeza, atención ambulatoria, entrega a tercero."
              value={reason}
              onChange={setReason}
            />

            <Input
              label="DNI tercero"
              placeholder="Ej: 87654321"
              value={thirdPartyDni}
              onChange={setThirdPartyDni}
            />
          </div>

          <Textarea
            label="Observaciones"
            placeholder="Observaciones generales de la dispensación"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Medicamentos</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Medicamento"
              value={selectedMedicationId}
              onChange={setSelectedMedicationId}
              options={medicationOptions}
            />

            <Input
              type="number"
              label="Cantidad"
              placeholder="Ej: 3"
              value={quantity}
              onChange={setQuantity}
            />

            <Input
              label="Dosis / indicación"
              placeholder="Ej: 1 tableta cada 8 horas"
              value={doseInstruction}
              onChange={setDoseInstruction}
            />

            <Input
              label="Observación del ítem"
              placeholder="Ej: Entrega para 3 días"
              value={observation}
              onChange={setObservation}
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleAddItem}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Agregar medicamento
            </button>
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
                        Cantidad: {item.quantity}
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
            disabled={isLoading || items.length === 0 || !reason.trim()}
            onClick={() => void handleSubmit()}
            className="rounded-2xl bg-[#0B1739] px-6 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Guardar dispensación'}
          </button>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateDispensationPage