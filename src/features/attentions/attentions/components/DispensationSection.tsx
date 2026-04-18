import { Button, Input, Textarea } from '@/shared/components/ui/form'
import { SearchSelect } from '@/shared/components/ui/form/SearchSelect'

type DispensationFormItem = {
  medicationId: number | null
  quantity: string
  doseInstruction: string
  observation: string
}

type MedicationOption = {
  label: string
  value: string | number
}

type Props = {
  requiresDispensation: boolean
  onRequiresDispensationChange: (value: boolean) => void

  reason: string
  onReasonChange: (value: string) => void

  notes: string
  onNotesChange: (value: string) => void

  items: DispensationFormItem[]
  onItemsChange: (items: DispensationFormItem[]) => void

  medicationOptions: MedicationOption[]
  isLoadingMedications?: boolean
}

const createEmptyItem = (): DispensationFormItem => ({
  medicationId: null,
  quantity: '',
  doseInstruction: '',
  observation: '',
})

const DispensationSection = ({
  requiresDispensation,
  onRequiresDispensationChange,
  reason,
  onReasonChange,
  notes,
  onNotesChange,
  items,
  onItemsChange,
  medicationOptions,
  isLoadingMedications = false,
}: Props) => {
  const handleAddItem = () => {
    onItemsChange([...items, createEmptyItem()])
  }

  const handleRemoveItem = (index: number) => {
    onItemsChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleChangeItem = <K extends keyof DispensationFormItem>(
    index: number,
    key: K,
    value: DispensationFormItem[K],
  ) => {
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      [key]: value,
    }

    onItemsChange(updatedItems)
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        Dispensación
      </h2>

      <div className="mt-4 space-y-4">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="checkbox"
            checked={requiresDispensation}
            onChange={(e) => onRequiresDispensationChange(e.target.checked)}
          />
          <span className="text-sm text-slate-700">
            Esta atención requiere dispensación
          </span>
        </label>

        {requiresDispensation ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Motivo de la dispensación"
                placeholder="Ej. Tratamiento sintomático"
                value={reason}
                onChange={onReasonChange}
              />

              <Textarea
                label="Notas de dispensación"
                placeholder="Agrega notas adicionales"
                value={notes}
                onChange={onNotesChange}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Medicamentos
                </h3>

                <Button
                  type="button"
                  variant="outline"
                  className="w-auto"
                  onClick={handleAddItem}
                >
                  Agregar medicamento
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                  Aún no has agregado medicamentos.
                </div>
              ) : null}

              {items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      Medicamento #{index + 1}
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-auto"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Quitar
                    </Button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <SearchSelect
                        label="Medicamento"
                        value={item.medicationId ?? ''}
                        onChange={(value) =>
                          handleChangeItem(
                            index,
                            'medicationId',
                            value ? Number(value) : null,
                          )
                        }
                        options={medicationOptions}
                        disabled={isLoadingMedications}
                        placeholder="Buscar medicamento..."
                      />
                    </div>

                    <Input
                      label="Cantidad"
                      type="number"
                      placeholder="Ingresa la cantidad"
                      value={item.quantity}
                      onChange={(value) =>
                        handleChangeItem(index, 'quantity', value)
                      }
                    />

                    <Input
                      label="Indicación de dosis"
                      placeholder="Ej. 1 tableta cada 8 horas"
                      value={item.doseInstruction}
                      onChange={(value) =>
                        handleChangeItem(index, 'doseInstruction', value)
                      }
                    />

                    <div className="md:col-span-2">
                      <Textarea
                        label="Observación"
                        placeholder="Agrega observaciones del medicamento"
                        value={item.observation}
                        onChange={(value) =>
                          handleChangeItem(index, 'observation', value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DispensationSection